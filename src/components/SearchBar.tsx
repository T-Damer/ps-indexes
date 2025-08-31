import CrossIcon from 'components/Icons/CrossIcon'
import SearchIcon from 'components/Icons/SearchIcon'

export default function ({
  search,
  setSearch,
}: {
  search?: number | undefined
  setSearch: (s: number | undefined) => void
}) {
  return (
    <label className="input input-bordered m-1 flex items-center gap-2">
      <input
        type="number"
        className="grow"
        placeholder="Поиск по номеру анализа"
        step="1"
        value={search}
        onInput={(e) => setSearch(e.currentTarget.valueAsNumber)}
      />
      {search ? (
        <CrossIcon onPress={() => setSearch(undefined)} />
      ) : (
        <SearchIcon />
      )}
    </label>
  )
}
