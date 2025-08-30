import Button from 'components/Button'
import Card from 'components/Card'
import testsDataStore from 'helpers/atoms/testsDataStore'
import handleError from 'helpers/handleError'
import scrollTop from 'helpers/scrollTop'
import { useAtom } from 'jotai'
import { useCallback } from 'preact/hooks'
import { v4 } from 'uuid'
import { useHashLocation } from 'wouter-preact/use-hash-location'

export default function ({ id, serial }: { id: string; serial: number }) {
  const [tests, setTests] = useAtom(testsDataStore)
  const [, setLocation] = useHashLocation()

  const onPress = useCallback(() => {
    setLocation(`/test/${id}`)
    scrollTop()
  }, [id, setLocation])

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
    <Card>
      <div className="flex w-full flex-col justify-between overflow-hidden">
        <div
          className="flex flex-1 flex-col"
          onClick={onPress}
          onKeyDown={onPress}
        >
          <span className="truncate-2 font-bold leading-snug">№{serial}</span>
          <span className="truncate text-[#00000080] dark:text-[#FFFFFF80]">
            {id}
          </span>
        </div>
        <Button onClick={onCopy} className="w-full">
          Копировать
        </Button>
      </div>
    </Card>
  )
}
