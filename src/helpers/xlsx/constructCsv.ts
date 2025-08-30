import type BloodSample from 'types/BloodSample'
import type { CommonContent } from 'types/BloodSample'

// before converting we need only: title and value, no need for header, keys and stuff
// Store as:
// title1, title2
// value1, value2

export default function constructCsv(dataObjToWrite: BloodSample) {
  // parse like this:
  const titles: string[] = []
  const values: string[] = []

  for (const headerId in dataObjToWrite) {
    for (const data of Object.values(
      dataObjToWrite[headerId as keyof BloodSample]
    )) {
      const { title, value } = data as CommonContent
      if (!title) continue
      const safeValue = value === undefined ? '-' : String(value)

      titles.push(title)
      values.push(String(safeValue))
    }
  }

  return {
    titles,
    values,
    plainString: `${titles.join('\t')}\n${values.join('\t')}`,
  }
}
