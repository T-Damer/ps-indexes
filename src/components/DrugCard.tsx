import { useState } from 'preact/hooks'
import Card from './Card'
import LabeledInput from './LabeledInput'
import GetHelp from './Icons/GetHelp'
import DefaultModal from './DefaultModal'
import { JSX } from 'preact/jsx-runtime'
import LabeledSelect from './LabeledSelect'
import { SelectOption } from 'types/Props'

export default function DrugCard({
  drugName,
  mass,
  extraDividend,
  dividendOptions,
  divisorOptions,
  extraDivisor,
  calc,
  modalBody,
  resultLabel = ' (мг)',
}: {
  drugName: string
  mass: number
  extraDividend?: string
  dividendOptions?: SelectOption[]
  extraDivisor?: string
  divisorOptions?: SelectOption[]
  calc: (mass: number, dividend: number, divisor: number) => number
  resultLabel?: string
  modalBody: JSX.Element
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [dividend, setDividend] = useState(
    Number(dividendOptions?.[0].value || 1)
  )
  const [divisor, setDivisor] = useState(Number(divisorOptions?.[0].value || 1))

  return (
    <Card className="flex-col justify-between cursor-default">
      <span className="text-sm font-bold">
        {drugName} <GetHelp size={14} onClick={() => setModalOpen(true)} />
      </span>

      <div>
        {extraDividend ? (
          <LabeledSelect
            label={extraDividend}
            labelClassName="text-xs"
            className="select-xs"
            onChange={(e) => setDividend(Number(e.currentTarget.value))}
            value={dividend}
            options={dividendOptions}
          />
        ) : null}
        {extraDivisor ? (
          <LabeledSelect
            label={extraDivisor}
            labelClassName="text-xs"
            className="select-xs"
            onInput={(e) => setDivisor(Number(e.currentTarget.value))}
            value={divisor}
            options={divisorOptions}
          />
        ) : null}

        <span className="flex text-xl font-bold underline mt-2">
          {Math.round(calc(mass, dividend, divisor) * 1000) / 1000}
          {resultLabel}
        </span>
      </div>

      <DefaultModal
        showModal={modalOpen}
        setShowModal={setModalOpen}
        body={() => modalBody}
      />
    </Card>
  )
}
