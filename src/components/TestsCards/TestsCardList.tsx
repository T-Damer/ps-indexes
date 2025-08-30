import TestCard from 'components/TestsCards/TestCard'
import testsDataStore from 'helpers/atoms/testsDataStore'
import { useAtomValue } from 'jotai'

export default function ({ search }: { search?: string }) {
  const tests = useAtomValue(testsDataStore)

  const cards = Object.entries(tests)
    .reverse()
    .map(([id, data], index) => {
      if (
        !search ||
        String(data.passport.historySerial.value)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return (
          <TestCard
            id={id}
            serial={data.passport.historySerial.value}
            key={id}
          />
        )
    })

  return <>{cards}</>
}
