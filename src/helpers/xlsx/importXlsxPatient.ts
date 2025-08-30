import handleError from 'helpers/handleError'
import type { JSXInternal } from 'preact/src/jsx'
import BloodSample from 'types/BloodSample'
import { read, utils } from 'xlsx'

export default async function (
  e: JSXInternal.TargetedInputEvent<HTMLInputElement>
) {
  const file = e.currentTarget?.files?.[0]

  if (!file) {
    const e = 'Не получилось загрузить файл'
    handleError({ e, toastMessage: e })
    return
  }

  const data = await file.arrayBuffer()
  const workBook = read(data)
  const workSheet = workBook.Sheets[workBook.SheetNames[0]]
  const result = utils.sheet_to_json(workSheet)
  const parsedHistory = result[0] as { [title: string]: string }

  const serial = parsedHistory['№ Анализа']

  if (!serial) {
    const e = 'Неправильный формат файла или нету номера анализа'
    handleError({ e, toastMessage: e })
    return
  }

  const newSample = new BloodSample(Number(serial))

  for (const [title, value] of Object.entries(parsedHistory)) {
    // Iterate over BloodSample properties, find the field with a matching title
    for (const sectionKey in newSample) {
      const section = newSample[sectionKey as keyof BloodSample]

      if (section && typeof section === 'object') {
        for (const fieldKey in section) {
          const field = section[fieldKey]
          if ('title' in field && field.title === title) {
            field.value = value
            break
          }
        }
      }
    }
  }

  return newSample
}
