import { saveAs } from 'file-saver'
import type BloodSample from 'types/BloodSample'
import { utils, type WorkBook, write } from 'xlsx'
import constructCsv from './constructCsv'

const fileExtension = '.xlsx'
export const sheetName = 'data'

function createXlsxBlob(data: BloodSample) {
  const { titles, values } = constructCsv(data)
  const workSheet = utils.aoa_to_sheet([titles, values])
  const workBook: WorkBook = {
    Sheets: { data: workSheet },
    SheetNames: [sheetName],
  }
  const excelBuffer = write(workBook, { bookType: 'xlsx', type: 'array' })
  return { blob: new Blob([excelBuffer]) }
}

export default function (fileName: string, data: BloodSample) {
  const { blob } = createXlsxBlob(data)
  const fullName = fileName + fileExtension

  if (window.Telegram?.WebApp) {
    // Check if downloadFile method is available
    if (typeof window.Telegram.WebApp.downloadFile === 'function') {
      try {
        const url = URL.createObjectURL(blob)
        window.Telegram.WebApp.downloadFile(url, fullName)
        return true
      } catch (error) {
        console.warn(
          'Telegram download failed, falling back to regular download:',
          error
        )
      }
    } else {
      console.warn('Telegram WebApp downloadFile method not available')
    }
  }

  saveAs(blob, fullName, { autoBom: true })
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        downloadFile: (url: string, filename?: string) => void
      }
    }
  }
}
