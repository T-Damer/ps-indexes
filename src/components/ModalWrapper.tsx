import { PropsWithChildren } from 'preact/compat'

export default function ModalWrapper({ children }: PropsWithChildren) {
  return <div className="mb-4">{children}</div>
}
