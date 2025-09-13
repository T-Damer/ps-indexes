import Button from 'components/Button'
import Card from 'components/Card'
import testsDataStore from 'helpers/atoms/testsDataStore'
import importXlsxPatient from 'helpers/xlsx/importXlsxPatient'
import { useSetAtom } from 'jotai'
import { useCallback, useState } from 'preact/hooks'
import BloodSample from 'types/BloodSample'
import ButtonTypes from 'types/Button'
import { v4 } from 'uuid'

export default function ImportSample() {
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
    <Card dashedOutline>
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
    </Card>
  )
}
