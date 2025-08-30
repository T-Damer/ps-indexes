const options = [0, 1]
const value = 0

// we can't store Date in localstore, it will convert into string
// so we use string types from <input type="" />
// string is default, so we don define it using type="string" in most key-value pairs
export type InputType = 'number' | 'date' | 'time' | 'string'
export type PlainValue = number | string | undefined
type InputObject = {
  value?: PlainValue
  step?: number
  title?: string
  placeholder?: string
  type?: InputType
}
type Options = { options: number[] | string[] }

export type CommonContent = InputObject & Partial<Options>

type Header = { header: { value: string } }
type PassportData = Header & {
  historySerial: { value: number; type: InputType; title: string }
  [key: string]: CommonContent
}
type CommonData = Header & { [key: string]: CommonContent }

export default class BloodSample {
  passport: Header & PassportData

  constructor(historySerial: number) {
    this.passport = {
      header: { value: 'Паспортная часть' },
      historySerial: {
        value: historySerial,
        type: 'number',
        title: '№ Анализа',
      },
      receiptDate: {
        type: 'date',
        title: 'Дата поступления',
      },
      dischargeDate: {
        type: 'date',
        title: 'Дата выписки',
      },
      admissionDiagnosis: {
        title: 'Диагноз при поступлении',
        placeholder: 'Б 30-31 нед, гес. ХВГП. Дифф.токс.зоб',
      },
      dateClinicalDiagnosis1: {
        type: 'date',
        title: 'Дата первого клинического диагноза',
      },
      clinicalDiagnosis1: {
        title: 'Первый клинический дагноз',
        placeholder:
          'Б 30-31 нед, гес. ХВГП. ОСА (хр.пиелонеф) Дифф.токс.зоб.ОГА (НМЦ,эндометриоз)',
      },
      dateClinicalDiagnosis2: {
        type: 'date',
        title: 'Дата второго клинического диагноза',
      },
      clinicalDiagnosis2: {
        title: 'Второй клинический диагноз',
        placeholder:
          'Роды 2,срочные,патологические.рубцовая деформация ш/м ХФПН.ХВГП.Гестоз(о),ср.ст.тяж',
      },
      dateFinalDiagnosis: {
        type: 'date',
        title: 'Дата заключительного диагноза',
      },
      finalDiagnosis: {
        title: 'Заключительный диагноз',
        placeholder:
          'Р1, преждевременные ,31 нед, пат, путем кес.сеч., гес. ХВГП. Дифф.токс.зоб',
      },
      age: {
        type: 'number',
        title: 'Возраст',
      },
      bloodType: {
        type: 'number',
        options: ['O (I)', 'A (II)', 'B (III)', 'AB (IV)'],
        title: 'Группа крови',
        value: 'O (I)',
      },
      Rh: {
        options: ['(+)', '(-)'],
        title: 'Резус фактор',
        value: '(+)',
      },
      height: {
        type: 'number',
        title: 'Рост матери',
        step: 0.1,
      },
      weight: {
        type: 'number',
        title: 'Вес матери',
        step: 0.1,
      },
      worksAt: {
        title: 'Работа',
        placeholder: 'Преподаватель',
      },
      livingConditions: {
        title: 'Социально-бытовые условия',
        options,
        value,
      },
      badHabits: {
        title: 'Вредные привычки',
        options,
        value,
      },
      drugs: {
        title: 'Лекарства',
      },
      complicatedSomaticHistory: {
        title: 'Отягощенный Соматический Анамнез (ОСА)',
        placeholder:
          'ОРВИ, грипп, ангины, 1977-операция на баталловом протоке, хр.гастрит',
      },
      complicatedGynecologyHistory: {
        title: 'Отягощенный Гинекологический Анамнез (ОГА)',
        placeholder: 'Эрозия шейки матки',
      },
      complicatedObstetricsHistory: {
        title: 'Отягощенный Акушерский Анамнез (ОАА)',
        type: 'number',
      },
      allergy: {
        title: 'Аллергологический анамнез',
        type: 'number',
      },
      genetics: {
        title: 'Генетические заболевания в семье',
        type: 'number',
      },
    }
  }
}

export type AvailableSections = keyof BloodSample
