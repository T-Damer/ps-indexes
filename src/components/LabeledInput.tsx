import { InputHTMLAttributes } from 'preact/compat'
import { ClassName } from 'types/Props'

export default function LabeledInput({
  label,
  className,
  labelClassName,
  ...inputProps
}: {
  labelClassName?: ClassName
  label?: string
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className={`label-text ${labelClassName}`}>{label}</span>
      </div>
      <input
        {...inputProps}
        className={`input input-bordered w-full ${className}`}
        style={{
          color: inputProps['aria-errormessage'] ? '#f87171' : undefined,
        }}
      />
    </label>
  )
}
