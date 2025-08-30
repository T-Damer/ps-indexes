import { PropsWithChildren } from 'preact/compat'
import { ClassNameProp } from 'types/Props'

interface CardProps extends PropsWithChildren {
  dashedOutline?: boolean
  onPress?: () => void
}

export default function ({
  children,
  dashedOutline,
  onPress,
  className,
}: CardProps & ClassNameProp) {
  const outline = dashedOutline ? 'border-dashed' : 'border-solid'
  const minWidth = dashedOutline ? '' : 'min-w-36 sm:min-w-64'
  const justify = dashedOutline ? 'justify-center' : 'justify-start'
  const bgHover = dashedOutline ? 'opacity-100' : 'hover:bg-opacity-70'

  return (
    <div
      className={`relative flex-1 overflow-hidden ${bgHover} ${minWidth} ${justify} min-h-40 border-2 border-neutral-content shadow-md ${outline} pointer-events-auto m-1 flex cursor-pointer rounded-box p-3 align-center transition-all ${className}`}
      onClick={onPress}
    >
      {children}
    </div>
  )
}
