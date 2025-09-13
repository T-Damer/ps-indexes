import type BloodSample from 'types/BloodSample'
import { formulas } from 'types/BloodSample'

// before converting we need only: title and value, no need for header, keys and stuff
// Store as:
// title1, title2
// value1, value2

export default function constructCsv(dataObjToWrite: BloodSample) {
  const titles: string[] = []
  const values: string[] = []

  // Add input data
  for (const [, input] of Object.entries(dataObjToWrite.inputs)) {
    if (!input.title) continue
    const safeValue =
      input.value === undefined || input.value === 0 ? '-' : String(input.value)

    titles.push(input.title)
    values.push(safeValue)
  }

  // Add calculated output data using the formulas object
  for (const [, formula] of Object.entries(formulas)) {
    if (!formula.title) continue
    const calculatedValue = formula.calc(dataObjToWrite)
    const safeValue = !Number.isFinite(calculatedValue)
      ? '-'
      : calculatedValue.toFixed(3)

    titles.push(formula.title)
    values.push(safeValue)
  }

  return {
    titles,
    values,
    plainString: `${titles.join('\t')}\n${values.join('\t')}`,
  }
}
