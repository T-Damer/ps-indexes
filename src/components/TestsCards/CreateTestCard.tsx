import Button from 'components/Button'
import Card from 'components/Card'
import HumanIcon from 'components/Icons/HumanIcon'
import testsDataStore from 'helpers/atoms/testsDataStore'
import handleError from 'helpers/handleError'
import importXlsxPatient from 'helpers/xlsx/importXlsxPatient'
import { useSetAtom } from 'jotai'
import { useCallback, useMemo, useState } from 'preact/hooks'
import BloodSample from 'types/BloodSample'
import ButtonTypes from 'types/Button'
import { v4 } from 'uuid'

function AddPatientForm() {
  const [historySerial, setHistorySerial] = useState<number | undefined>()
  const setTestsData = useSetAtom(testsDataStore)

  const clearData = useCallback(() => {
    setHistorySerial(undefined)
  }, [])

  const onSubmit = useCallback(() => {
    if (!historySerial) {
      const e = 'Нет серийного номера истории'
      handleError({ e, toastMessage: e })
      return
    }

    setTestsData((prevData) => ({
      ...prevData,
      [v4()]: new BloodSample(historySerial),
    }))

    clearData()
  }, [historySerial, setTestsData, clearData])

  const disabled = useMemo(() => !historySerial, [historySerial])

  return (
    <div className="flex flex-col justify-center gap-2">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="number"
          min="0"
          step="1"
          placeholder="№ Анализа"
          className="grow"
          onInput={(e) => setHistorySerial(e.currentTarget.valueAsNumber)}
          value={historySerial || ''}
          required
        />
        <HumanIcon />
      </label>

      <div className="flex items-center gap-x-2 pr-1.5">
        <Button
          buttonType={ButtonTypes.success}
          disabled={disabled}
          onClick={onSubmit}
          className="w-1/2"
        >
          Добавить
        </Button>

        <Button
          buttonType={ButtonTypes.error}
          onClick={clearData}
          disabled={disabled}
          className="w-1/2"
        >
          Очистить
        </Button>
      </div>
    </div>
  )
}

function ImportPatient() {
  const setTests = useSetAtom(testsDataStore)
  const [parsedResult, setParsedResult] = useState<BloodSample | null>(null)
  const onClick = useCallback(() => {
    if (!parsedResult) return

    const rand = v4()

    setTests((prev) => ({
      ...prev,
      [rand]: parsedResult,
    }))
  }, [parsedResult, setTests])

  return (
    <div className="flex flex-col justify-center gap-2">
      <input
        type="file"
        accept=".xls,.xlsx"
        class="file-input file-input-bordered w-full"
        onInput={async (e) => {
          const newPatient = await importXlsxPatient(e)
          if (!newPatient) return
          setParsedResult(newPatient)
        }}
      />
      <Button
        buttonType={ButtonTypes.success}
        onClick={onClick}
        disabled={!parsedResult}
      >
        Загрузить
      </Button>
    </div>
  )
}

export default function () {
  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row">
      <Card dashedOutline>
        <AddPatientForm />
      </Card>
      <Card dashedOutline>
        <ImportPatient />
      </Card>
    </div>
  )
}
