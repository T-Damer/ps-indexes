import TestCard from 'components/TestsCards/TestCard'
import testsDataStore from 'helpers/atoms/testsDataStore'
import { useAtomValue } from 'jotai'

export default function ({ search }: { search?: number | undefined }) {
  const tests = useAtomValue(testsDataStore)

  const cards = Object.entries(tests)
    .reverse()
    .map(([id, data]) => {
      if (!search || data.serial === search)
        return <TestCard id={id} serial={data.serial} key={id} />
    })

  return <>{cards}</>
}
