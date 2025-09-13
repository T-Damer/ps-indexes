import ModalWrapper from 'components/ModalWrapper'
import { JSX } from 'preact/jsx-runtime'

/* -------------------- Types -------------------- */

export type InputType = 'number' | 'date' | 'time' | 'string'
export type PlainValue = number | undefined

type InputObject = {
  title: string
  value: PlainValue
  step?: number
  placeholder?: string
  type: InputType
  range?: { min: number; max: number }
  min?: number
}
type Options = { options: number[] | string[] }

export type CommonContent = InputObject & Partial<Options>

type Header = { header: { value: string } }
type SampleData = { [key: string]: CommonContent }

export type OutputData = {
  [key: string]: {
    title: string
    calc: (sample: BloodSample) => number
    normalRange: { min: number; max: number }
    description: JSX.Element
  }
}

export type CommonData = Header & { [key: string]: CommonContent }

/* -------------------- Base Input Config -------------------- */

const commonInput: Omit<InputObject, 'title'> = {
  value: 0,
  min: 0,
  step: 0.01,
  type: 'number',
  placeholder: 'Абсолютное число',
}

/* -------------------- Input Schema -------------------- */

export const inputSchema: Record<string, CommonContent> = {
  lymphocytes: {
    ...commonInput,
    title: 'Лимфоциты (абс.)',
    range: { min: 1.2, max: 3 },
  },
  lymphocytesRel: {
    ...commonInput,
    title: 'Лимфоциты (отн. %)',
  },
  neutrophils: {
    ...commonInput,
    title: 'Нейтрофилы (абс.)',
    range: { min: 2, max: 5.5 },
  },
  neutrophilsRel: {
    ...commonInput,
    title: 'Нейтрофилы (отн. %)',
  },
  monocytes: {
    ...commonInput,
    title: 'Моноциты (абс.)',
    range: { min: 0.09, max: 0.6 },
  },
  monocytesRel: { ...commonInput, title: 'Моноциты (отн. %)' },
  eosinophils: { ...commonInput, title: 'Эозинофилы (абс.)' },
  eosinophilsRel: { ...commonInput, title: 'Эозинофилы (отн. %)' },
  basophils: { ...commonInput, title: 'Базофилы (абс.)' },
  basophilsRel: { ...commonInput, title: 'Базофилы (отн. %)' },
  leukocytes: {
    ...commonInput,
    title: 'Лейкоциты (абс.)',
    range: { min: 4, max: 9 },
  },
  esr: {
    ...commonInput,
    title: 'СОЭ',
    placeholder: 'абс.',
    range: { min: 2, max: 15 },
  },
  platelets: {
    ...commonInput,
    title: 'Тромбоциты (абс.)',
    range: { min: 180, max: 320 },
  },
  plateletcrit: {
    ...commonInput,
    title: 'Тромбокрит',
    placeholder: 'отн. (%)',
  },
  hgb: { ...commonInput, title: 'Гемоглобин' },
  hct: { ...commonInput, title: 'Гематокрит', placeholder: 'Относительно (%)' },
}

/* -------------------- Utility Functions -------------------- */

export const getValue = (bloodSample: BloodSample, key: string): number => {
  return Number(bloodSample?.inputs?.[key]?.value) || 0
}

export const formatNumber = (val: number, decimals = 3): string => {
  return Number.isFinite(val) ? Number(val).toFixed(decimals) : '-'
}

/* -------------------- Formulas -------------------- */

const lymphIndexRange = { min: 0.39, max: 0.47 }
const lymphGranIndexRange = { min: 3.87, max: 4.45 }
const leuShiftRange = { min: 1.72, max: 2.33 }
const leuESRRange = { min: 0.08, max: 1.8 }
const lymMonoIndexRange = { min: 3.36, max: 8 }
const immuneReactivityRange = { min: 3.8, max: 6.5 }
const leuResistanceRange = { min: 1.8, max: 1.8 }
const agranulocyteESRRange = { min: 3.2, max: 11 }
const platLymphIndexRange = { min: 106, max: 150 }
const systemImmIndexRange = { min: 342.8, max: 544.2 }

export const formulas: OutputData = {
  lymphocyteIndex: {
    title: 'Лимфоцитарный индекс (ЛИ)',
    calc: (s: BloodSample) => {
      const lymphocytes = getValue(s, 'lymphocytes')
      const neutrophils = getValue(s, 'neutrophils')
      return lymphocytes / neutrophils
    },
    normalRange: lymphIndexRange,
    description: (
      <ModalWrapper>
        <p>– Лимфоциты (абс.) / Нейтрофилы (абс.)</p>
        <p>
          – Норма: {lymphIndexRange.min}-{lymphIndexRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  lymphGranIndex: {
    title: 'Лимфоцитарно-грaнулoцитарный индекс (ИЛГ)',
    calc: (s: BloodSample) => {
      const lym = getValue(s, 'lymphocytesRel')
      const neu = getValue(s, 'neutrophilsRel')
      const eos = getValue(s, 'eosinophilsRel')

      return (lym * 10) / (eos + neu)
    },
    normalRange: lymphGranIndexRange,
    description: (
      <ModalWrapper>
        <p>– (лим. % х 10) / (эоз. % + нейтр. %)</p>
        <p>
          – Норма: {lymphGranIndexRange.min}-{lymphGranIndexRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  leuShiftIndex: {
    title: 'Индекс сдвига лейкoцитов в крови по Н.И. Яблучанскому (ИСЛК)',
    calc: (s: BloodSample) => {
      const lym = getValue(s, 'lymphocytes')
      const neu = getValue(s, 'neutrophils')
      const eos = getValue(s, 'eosinophils')
      const bas = getValue(s, 'basophils')
      const mon = getValue(s, 'monocytes')

      return (neu + eos + bas) / (lym + mon)
    },
    normalRange: leuShiftRange,
    description: (
      <ModalWrapper>
        <p>
          – (нейтр. (абс) + эоз. (абс) + баз. (абс)) / (лим. (абс) + мон. (абс))
        </p>
        <p>
          – Норма: {leuShiftRange.min}-{leuShiftRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  intoxicationIndex: {
    title: 'Показатель интоксикации (ПИ)*',
    calc: (s: BloodSample) => {
      const lym = getValue(s, 'lymphocyteIndex')
      const neu = getValue(s, 'neutrophils')
      const eos = getValue(s, 'eosinophils')
      const bas = getValue(s, 'basophils')
      const mon = getValue(s, 'monocytes')

      return (lym * neu * eos * bas * mon) / 1000
    },
    normalRange: { min: 0, max: 1.8 },
    description: (
      <ModalWrapper>
        <p>– (ЛИИ × лейкоциты, Г/л × СОЭ, мм/ч) / 1000</p>
        <p>– Норма: до 1.8</p>
      </ModalWrapper>
    ),
  },
  leuESR: {
    title: 'Индекс соотношения лейкоцитов к COЭ (ИЛСOЭ)',
    calc: (s: BloodSample) => {
      const lym = getValue(s, 'lymphocyteIndex')
      const esr = getValue(s, 'esr')

      return (lym * esr) / 100
    },
    normalRange: leuESRRange,
    description: (
      <ModalWrapper>
        <p>– (лим. % х СОЭ) / 100</p>
        <p>
          – Норма: {leuESRRange.min}-{leuESRRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  leuMonoIndex: {
    title: 'Индекс соотнoшения лимфоцитoв к моноцитам (ИСЛМ)',
    calc: (s: BloodSample) => {
      const lym = getValue(s, 'lymphocytes')
      const mon = getValue(s, 'monocytes')

      return lym / mon
    },
    normalRange: lymMonoIndexRange,
    description: (
      <ModalWrapper>
        <p>– (лим. (абс)) / (мон. (абс))</p>
        <p>
          – Норма: {lymMonoIndexRange.min}-{lymMonoIndexRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  immuneReactivityIndex: {
    title: 'Индекc иммунорeактивности (ИРИ)',
    calc: (s: BloodSample) => {
      const lym = getValue(s, 'lymphocytesRel')
      const eos = getValue(s, 'eosinophilsRel')
      const mon = getValue(s, 'monocytesRel')

      return (lym + eos) / mon
    },
    normalRange: immuneReactivityRange,
    description: (
      <ModalWrapper>
        <p>– (лимф. % + эоз. %) / (мон. %)</p>
        <p>
          – Норма: {immuneReactivityRange.min}-{immuneReactivityRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  leuResistanceIndex: {
    title: 'Лейкоцитарный индекс резистентности по Химичу (ЛИР)*',
    calc: (s: BloodSample) => {
      const leuk = getValue(s, 'leukocytes')
      const neuRel = getValue(s, 'neutrophilsRel')
      const neu = getValue(s, 'neutrophils')

      return (0.1 * leuk * neuRel) / (100 - neu)
    },
    normalRange: leuResistanceRange,
    description: (
      <ModalWrapper>
        <p>– (0,1 х Лейк. × Нейтр. (%)) / (100 – Нейтр.)</p>
        <p>
          – Норма: {leuResistanceRange.min}-{leuResistanceRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  agranulocyteESRindex: {
    title: 'Индекс соотношения агранулоцитов к СОЭ (ИСАСОЭ)',
    calc: (s: BloodSample) => {
      const lym = getValue(s, 'lymphocytes')
      const mon = getValue(s, 'monocytes')
      const esr = getValue(s, 'esr')

      return (lym + mon) / esr
    },
    normalRange: agranulocyteESRRange,
    description: (
      <ModalWrapper>
        <p>– (лим. (абс) + мон. (абс)) / СОЭ</p>
        <p>
          – Норма: {agranulocyteESRRange.min}-{agranulocyteESRRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  platLymphIndex: {
    title: 'Тромбоцитарно-лимфоцитарный индекс (ТЛИ)',
    calc: (s: BloodSample) => {
      const plat = getValue(s, 'platelets')
      const lym = getValue(s, 'lymphocytes')

      return plat / lym
    },
    normalRange: platLymphIndexRange,
    description: (
      <ModalWrapper>
        <p>– (тромб. (абс)) / (лим. (абс))</p>
        <p>
          – Норма: {platLymphIndexRange.min}-{platLymphIndexRange.max}
        </p>
      </ModalWrapper>
    ),
  },
  systemImmunoinflammatoryIndex: {
    title: 'системный иммуновоспалительный индекс (SII)',
    calc: (s: BloodSample) => {
      const plat = getValue(s, 'platelets')
      const neu = getValue(s, 'neutrophils')
      const lym = getValue(s, 'lymphocytes')

      return (plat * neu) / lym
    },
    normalRange: systemImmIndexRange,
    description: (
      <ModalWrapper>
        <p>– (тромб. (абс) × нейтр. (абс)) / лим. (абс)</p>
        <p>
          – Норма: {systemImmIndexRange.min}-{systemImmIndexRange.max}
        </p>
      </ModalWrapper>
    ),
  },
}

export type FormulasKeys = keyof typeof formulas

/* -------------------- Model -------------------- */

export default class BloodSample {
  serial: number
  inputs: SampleData
  outputs: OutputData

  constructor(serial: number) {
    this.serial = serial
    this.inputs = structuredClone(inputSchema)
    this.outputs = formulas
  }
}

/* -------------------- Types for UI -------------------- */

export type InputToResultKey = keyof typeof formulas
export type ModalKeys = keyof typeof formulas

export const getOutputValue = (
  bloodSample: BloodSample,
  key: InputToResultKey
) => {
  return formulas[key].calc(bloodSample)
}

export const getModalContent = (key: ModalKeys) => {
  return formulas[key]?.description
}
