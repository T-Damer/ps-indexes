import { useAutoAnimate } from '@formkit/auto-animate/preact'
import { useState } from 'preact/hooks'
import SearchBar from 'components/SearchBar'
import { availablePages } from 'types/AvailablePages'
import AppCard from 'components/AppCard'

export default function () {
  const [parentRef] = useAutoAnimate()
  const [search, setSearch] = useState('')

  return (
    <div>
      <h1>👶 neoN</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-wrap" ref={parentRef}>
        {availablePages.map(({ title, location }) => (
          <AppCard key={location} title={title} location={location} />
        ))}
      </div>
    </div>
  )
}
