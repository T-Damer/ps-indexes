import { useCallback } from 'preact/hooks'
import { useHashLocation } from 'wouter-preact/use-hash-location'
import Card from 'components/Card'
import scrollTop from 'helpers/scrollTop'
import { JSX } from 'preact/jsx-runtime'

export default function ({
  title,
  location,
  icon,
}: {
  title: string
  location: string
  icon?: () => JSX.Element
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
      {icon ? (
        <div className="absolute opacity-10 rotate-45 -left-4 sm:left-0 -bottom-8 sm:bottom-0 w-full h-full pointer-events-none">
          {icon()}
        </div>
      ) : null}
    </Card>
  )
}
