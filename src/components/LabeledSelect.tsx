import { SelectHTMLAttributes } from 'preact/compat'
import { ClassName, SelectOption } from 'types/Props'

export default function LabeledSelect({
  label,
  className,
  labelClassName,
  options,
  ...selectProps
}: {
  options?: SelectOption[] | undefined
  labelClassName?: ClassName
  label?: string
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className={`label-text ${labelClassName}`}>{label}</span>
      </div>

      <select
        {...selectProps}
        class={`select select-bordered w-full ${className}`}
      >
        {options?.map(({ value, ...rest }) => (
          <option {...rest}>{value}</option>
        ))}
      </select>
    </label>
  )
}
