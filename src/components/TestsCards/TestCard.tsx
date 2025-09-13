import Card from 'components/Card'
import scrollTop from 'helpers/scrollTop'
import { useCallback } from 'preact/hooks'
import { useHashLocation } from 'wouter-preact/use-hash-location'

export default function TestCard({
  id,
  serial,
}: {
  id: string
  serial: number
}) {
  const [, setLocation] = useHashLocation()

  const onPress = useCallback(() => {
    setLocation(`/test/${id}`)
    scrollTop()
  }, [id, setLocation])

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
        {/* <CopyButton id={id} /> */}
      </div>
    </Card>
  )
}
