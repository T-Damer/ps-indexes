import { InputHTMLAttributes } from 'preact/compat'

export default function LabeledInput({
  label,
  ...inputProps
}: {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input {...inputProps} className="input input-bordered w-full max-w-xs" />
    </label>
  )
}
