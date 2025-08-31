import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import BloodSample from 'types/BloodSample'
import { SelectOption } from 'types/Props'
import Card from './Card'
import DefaultModal from './DefaultModal'
import GetHelp from './Icons/GetHelp'
import LabeledSelect from './LabeledSelect'

export default function SampleCard({
  sampleName,
  bloodSample,
  extraDividend,
  dividendOptions,
  divisorOptions,
  extraDivisor,
  calc,
  modalBody,
  resultLabel = '',
}: {
  sampleName: string
  bloodSample?: BloodSample
  extraDividend?: string
  dividendOptions?: SelectOption[]
  extraDivisor?: string
  divisorOptions?: SelectOption[]
  calc: (dividend: number, divisor: number, bloodSample?: BloodSample) => number
  resultLabel?: string
  modalBody: JSX.Element
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [dividend, setDividend] = useState(
    Number(dividendOptions?.[0].value || 1)
  )
  const [divisor, setDivisor] = useState(Number(divisorOptions?.[0].value || 1))

  return (
    <Card className="cursor-default flex-col justify-between">
      <span className="font-bold text-sm">
        {sampleName} <GetHelp size={14} onClick={() => setModalOpen(true)} />
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

        <span className="mt-2 flex font-bold text-xl underline">
          {Math.round(calc(dividend, divisor, bloodSample) * 1000) / 1000}
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
