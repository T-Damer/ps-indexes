import Button from 'components/Button'
import testsDataStore from 'helpers/atoms/testsDataStore'
import goMain from 'helpers/goMain'
import saveObjectAsXlsx from 'helpers/xlsx/saveObjectAsXlsx'
import { useSetAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import type BloodSample from 'types/BloodSample'
import { navigate } from 'wouter-preact/use-hash-location'
import ArrowLeft from './Icons/ArrowLeft'
import Save from './Icons/Save'
import TrashBin from './Icons/TrashBin'

interface DetailsHeaderProps {
  right?: JSX.Element
  bloodSample?: BloodSample
  id?: string
}

export default function DetailsHeader({
  right,
  bloodSample,
  id,
}: DetailsHeaderProps) {
  const setTests = useSetAtom(testsDataStore)

  const handleSave = useCallback(() => {
    if (!bloodSample) return

    const timestamp = new Date().toISOString().split('T')[0]
    const fileName = `blood-sample-${bloodSample.serial}-${timestamp}`
    saveObjectAsXlsx(fileName, bloodSample)
  }, [bloodSample])

  const handleDelete = useCallback(() => {
    if (!id) return

    if (confirm('Вы уверены, что хотите удалить этот анализ?')) {
      setTests((prev) => {
        const updated = { ...prev }
        delete updated[id]
        return updated
      })

      // Navigate after deletion with timeout to prevent error
      setTimeout(() => {
        navigate('/')
      }, 100)
    }
  }, [id, setTests])

  return (
    <div className="flex items-center justify-between print:hidden">
      <Button onClick={goMain}>
        <ArrowLeft />
      </Button>
      {right}
      <div className="flex gap-x-2">
        <Button onClick={handleSave} disabled={!bloodSample}>
          <Save />
        </Button>
        <Button onClick={handleDelete} disabled={!id}>
          <TrashBin />
        </Button>
      </div>
    </div>
  )
}
