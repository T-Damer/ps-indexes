import Card from 'components/Card'
import scrollTop from 'helpers/scrollTop'
import { useCallback } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import { useHashLocation } from 'wouter-preact/use-hash-location'

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
      <div className="flex flex-1 flex-col" onClick={onPress}>
        <span className="font-bold">{title}</span>
      </div>
      {icon ? (
        <div className="-left-4 -bottom-8 pointer-events-none absolute h-full w-full rotate-45 opacity-10 sm:bottom-0 sm:left-0">
          {icon()}
        </div>
      ) : null}
    </Card>
  )
}
