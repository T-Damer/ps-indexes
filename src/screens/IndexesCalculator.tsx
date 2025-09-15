import DetailsHeader from 'components/DetailsHeader'
import LabeledInput from 'components/LabeledInput'
import SampleCard from 'components/SampleCard'
import testsDataStore from 'helpers/atoms/testsDataStore'
import handleError from 'helpers/handleError'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import {
  InputToResultKey,
  ModalKeys,
  getModalContent,
  getOutputValue,
} from 'types/BloodSample'
import { navigate } from 'wouter-preact/use-hash-location'

export default function IndexesCalculator({ id }: { id: string }) {
  const [tests, setTests] = useAtom(testsDataStore)

  const bloodSample = tests[id]

  if (!bloodSample) {
    const e = 'Анализ не найден'
    handleError({ e, toastMessage: e })
    navigate('/')
    return
  }

  const updateInputValue = useCallback(
    (key: string, value: number) => {
      setTests((prev) => {
        const updated = { ...prev[id] }
        updated.inputs = {
          ...updated.inputs,
          [key]: { ...updated.inputs[key], value },
        }
        return { ...prev, [id]: updated }
      })
    },
    [id, setTests]
  )

  return (
    <div>
      <DetailsHeader bloodSample={bloodSample} id={id} />

      <div className="grid grid-cols-2 gap-2">
        {Object.entries(bloodSample.inputs).map(([key, input]) => (
          <LabeledInput
            key={key}
            label={input.title}
            value={input.value}
            step={input.step}
            placeholder={input.placeholder}
            min={input.min}
            type={input.type}
            data-isLow={Boolean(
              input.range &&
                input.value !== 0 &&
                Number(input.value) < input.range.min
            )}
            data-isHigh={Boolean(
              input.range &&
                input.value !== 0 &&
                Number(input.value) > input.range.max
            )}
            onInput={(e) => {
              const newValue = e.currentTarget.valueAsNumber || 0
              updateInputValue(key, newValue)
            }}
          />
        ))}
      </div>

      <div className="mt-2 flex flex-row flex-wrap gap-y-2">
        {Object.entries(bloodSample.outputs).map(([key, output]) => (
          <SampleCard
            key={output.title}
            sampleName={output.title}
            bloodSample={bloodSample}
            calc={(bloodSample) => {
              return getOutputValue(bloodSample, key as InputToResultKey)
            }}
            modalBody={getModalContent(key as ModalKeys)}
            normalRange={output.normalRange}
          />
        ))}
      </div>
    </div>
  )
}
