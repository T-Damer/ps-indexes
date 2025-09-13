import clsx from 'clsx'
import { InputHTMLAttributes } from 'preact/compat'
import { ClassName } from 'types/Props'

type CustomInputProps = {
  labelClassName?: ClassName
  label?: string
  'data-isLow'?: boolean
  'data-isHigh'?: boolean
}

export default function LabeledInput({
  label,
  className,
  labelClassName,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & CustomInputProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className={`label-text ${labelClassName}`}>{label}</span>
      </div>
      <input
        {...inputProps}
        className={clsx('input input-bordered w-full', className, {
          'input-error': inputProps['data-isHigh'],
          'input-warning': inputProps['data-isLow'],
          'input-success':
            inputProps.value !== 0 &&
            !inputProps['data-isLow'] &&
            !inputProps['data-isHigh'],
        })}
      />
    </label>
  )
}
