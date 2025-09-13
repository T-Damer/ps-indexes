import clsx from 'clsx'
import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import BloodSample from 'types/BloodSample'
import Card from './Card'
import DefaultModal from './DefaultModal'
import GetHelp from './Icons/GetHelp'

const formatNumber = (val: number, decimals = 3) =>
  Number.isFinite(val) ? val.toFixed(decimals) : '-'

export default function SampleCard({
  sampleName,
  bloodSample,
  calc,
  modalBody,
  resultLabel = '',
  normalRange,
}: {
  sampleName: string
  bloodSample: BloodSample
  calc: (bloodSample: BloodSample) => number
  resultLabel?: string
  modalBody: JSX.Element
  normalRange: { min: number; max: number }
}) {
  const [modalOpen, setModalOpen] = useState(false)

  const calcRes = calc(bloodSample)
  const formattedRes = formatNumber(calcRes)
  const hasValue = formattedRes !== '-' && calcRes !== 0

  return (
    <Card
      className="cursor-default flex-col justify-between"
      onPress={() => setModalOpen(true)}
    >
      <span className="font-bold text-sm">
        {sampleName} <GetHelp size={14} onClick={() => setModalOpen(true)} />
      </span>

      <div>
        <span
          className={clsx('mt-2 flex font-bold text-xl underline', {
            'text-error': hasValue && calcRes > normalRange.max,
            'text-warning': hasValue && calcRes < normalRange.min,
            'text-success':
              hasValue &&
              calcRes >= normalRange.min &&
              calcRes <= normalRange.max,
          })}
        >
          {formattedRes}
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
