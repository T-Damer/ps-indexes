const commonInput = {
  value: 0,
  min: 0,
  step: 0.01,
  type: 'number' as InputType,
  placeholder: 'Абсолютное число',
}

// we can't store Date in localstore, it will convert into string
// so we use string types from <input type="" />
// string is default, so we don define it using type="string" in most key-value pairs
export type InputType = 'number' | 'date' | 'time' | 'string'
export type PlainValue = number | string | undefined
type InputObject = {
  title: string
  value: PlainValue
  step?: number
  placeholder?: string
  type: InputType
  min?: number
}
type Options = { options: number[] | string[] }

export type CommonContent = InputObject & Partial<Options>

type Header = { header: { value: string } }
type SampleData = {
  [key: string]: CommonContent
}
export type CommonData = Header & { [key: string]: CommonContent }

export default class BloodSample {
  serial: number
  inputs: SampleData

  constructor(serial: number) {
    this.serial = serial
    this.inputs = {
      lymphocytes: {
        ...commonInput,
        title: 'Лимфоциты',
      },
      neutrophils: {
        ...commonInput,
        title: 'Нейтрофилы',
      },
      monocytes: {
        ...commonInput,
        title: 'Моноциты',
      },
      eosinophils: {
        ...commonInput,
        title: 'Эозинофилы',
      },
      basophils: {
        ...commonInput,
        title: 'Базофилы',
      },
      leukocytes: {
        ...commonInput,
        title: 'Лейкоциты',
      },
      esr: {
        ...commonInput,
        placeholder: 'Относительно (%)',
        title: 'СОЭ',
      },
      platelets: {
        ...commonInput,
        title: 'Тромбоциты',
      },
      plateletcrit: {
        ...commonInput,
        placeholder: 'Относительно (%)',
        title: 'Тромбокрит',
      },
      hgb: {
        ...commonInput,
        title: 'Гемоглобин',
      },
      hct: {
        ...commonInput,
        placeholder: 'Относительно (%)',
        title: 'Гематокрит',
      },
    }
  }
}

export type AvailableSections = keyof BloodSample
