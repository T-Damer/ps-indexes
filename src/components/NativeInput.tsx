import clsx from 'clsx'
import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ClassName } from 'types/Props.js'

interface NativeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number | undefined
  useCustomControls?: boolean
  onValueChange: (value: number | null) => void

  labelClassName?: ClassName
  label?: string
  'data-isLow'?: boolean
  'data-isHigh'?: boolean
}

export const NativeNumericInput = ({
  value,
  useCustomControls = true,
  onValueChange,
  labelClassName,
  className,
  label,
  ...inputProps
}: NativeInputProps) => {
  const [displayValue, setDisplayValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const newDisplayValue = (value ?? '').toString()
    setDisplayValue(newDisplayValue)
  }, [value])

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setDisplayValue(newValue)

    if (newValue === '') {
      onValueChange(null)
      return
    }

    onValueChange(Number(newValue))
  }

  return (
    <label htmlFor="native-input" className="form-control w-full">
      <div className="label">
        <span className={`label-text ${labelClassName}`}>{label}</span>
      </div>
      <input
        ref={inputRef}
        type="number"
        id="native-input"
        value={displayValue}
        onChange={handleValueChange}
        inputMode="numeric"
        className={clsx('input input-bordered w-full', className, {
          'input-error': inputProps['data-isHigh'],
          'input-warning': inputProps['data-isLow'],
          'input-success':
            value !== 0 &&
            !inputProps['data-isLow'] &&
            !inputProps['data-isHigh'],
        })}
      />
    </label>
  )
}
