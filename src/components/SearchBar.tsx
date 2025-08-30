import CrossIcon from 'components/Icons/CrossIcon'
import SearchIcon from 'components/Icons/SearchIcon'

export default function ({
  search,
  setSearch,
}: {
  search?: string
  setSearch: (s: string) => void
}) {
  return (
    <label className="input input-bordered m-1 flex items-center gap-2">
      <input
        type="text"
        className="grow"
        placeholder="Поиск по номеру анализа"
        value={search}
        onInput={(e) => setSearch(e.currentTarget.value)}
      />
      {search ? <CrossIcon onPress={() => setSearch('')} /> : <SearchIcon />}
    </label>
  )
}
