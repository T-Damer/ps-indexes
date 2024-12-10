import { useCallback } from 'preact/hooks'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import Card from 'components/Card'
import scrollTop from 'helpers/scrollTop'

export default function ({
  title,
  location,
}: {
  title: string
  location: string
}) {
  const [, setLocation] = useHashLocation()

  const onPress = useCallback(() => {
    setLocation(location)
    scrollTop()
  }, [setLocation, location])

  return (
    <Card>
      <div className="flex-1 flex flex-col" onClick={onPress}>
        <span className="font-bold truncate-2 leading-snug">{title}</span>
      </div>
    </Card>
  )
}
