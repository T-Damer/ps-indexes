import { saveAs } from 'file-saver'
import { isTelegram } from 'helpers/isTelegram'
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

  if (isTelegram()) {
    const tgApp = isTelegram()
    const url = URL.createObjectURL(blob)
    // @ts-ignore
    tgApp?.downloadFile(url, fullName)

    return
  }

  saveAs(blob, fullName, { autoBom: true })
}
