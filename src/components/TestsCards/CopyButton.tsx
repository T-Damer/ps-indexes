import Button from 'components/Button'
import testsDataStore from 'helpers/atoms/testsDataStore'
import handleError from 'helpers/handleError'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import { v4 } from 'uuid'

export default function CopyButton({ id }: { id: string }) {
  const [tests, setTests] = useAtom(testsDataStore)

  const onCopy = useCallback(() => {
    const currentTest = tests[id]

    if (!currentTest) {
      const e = 'Анализ не найден'
      handleError({ e, toastMessage: e })
      return
    }

    setTests((prev) => ({
      ...prev,
      [v4()]: currentTest,
    }))
  }, [tests, id, setTests])

  return (
    <Button onClick={onCopy} className="w-full">
      Копировать
    </Button>
  )
}
