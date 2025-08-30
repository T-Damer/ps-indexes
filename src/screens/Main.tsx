import { useAutoAnimate } from '@formkit/auto-animate/preact'
import SearchBar from 'components/SearchBar'
import CreateTestCard from 'components/TestsCards/CreateTestCard'
import TestsCardList from 'components/TestsCards/TestsCardList'
import { useState } from 'preact/hooks'

export default function () {
  const [parentRef] = useAutoAnimate()
  const [search, setSearch] = useState('')

  return (
    <div>
      <h1>💉 Подсчет Индексов</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-wrap" ref={parentRef}>
        <CreateTestCard />
        <TestsCardList search={search} />
      </div>
    </div>
  )
}
