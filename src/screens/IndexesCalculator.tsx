import DetailsHeader from 'components/DetailsHeader'
import LabeledInput from 'components/LabeledInput'
import SampleCard from 'components/SampleCard'
import testsDataStore from 'helpers/atoms/testsDataStore'
import handleError from 'helpers/handleError'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import { getLymphocyteIndex } from 'types/BloodSample'
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
    (inputTitle: string, newValue: number) => {
      setTests((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          inputs: {
            ...prev[id].inputs,
            [inputTitle]: {
              ...prev[id].inputs[inputTitle],
              value: newValue,
            },
          },
        },
      }))
    },
    [id, setTests]
  )

  return (
    <div>
      <DetailsHeader />

      {Object.entries(bloodSample.inputs).map(([key, input]) => (
        <LabeledInput
          key={key}
          label={input.title}
          value={input.value}
          step={input.step}
          placeholder={input.placeholder}
          min={input.min}
          type={input.type}
          onInput={(e) => {
            const newValue = e.currentTarget.valueAsNumber || 0
            console.log(newValue)
            updateInputValue(key, newValue)
          }}
        />
      ))}

      <div className="mt-2 flex flex-row flex-wrap gap-y-2">
        {Object.values(bloodSample.outputs).map((output) => (
          <SampleCard
            key={output.title}
            sampleName={output.title}
            bloodSample={bloodSample}
            calc={(_dividend, _divisor, bloodSample) =>
              bloodSample ? getLymphocyteIndex(bloodSample) : 0
            }
            modalBody={
              <div className="mb-4">
                <p>– Лимфоциты / Нейтрофилы</p>
                <p>– Норма: 0.2-0.4</p>
              </div>
            }
          />
        ))}
      </div>
    </div>
  )
}
