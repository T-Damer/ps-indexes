import Close from 'components/Icons/Close'
import { ReactNode, useCallback } from 'react'
import { ClassName, DefaultModalProps } from 'types/Props'
import { Drawer } from 'vaul'

export default function ({
  showModal,
  setShowModal,
  onCloseCallback,
  header = () => <Close />,
  body,
  footer,
  contentClassName,
  bodyWrapperClassName,
  footerWrapperClassName,
  repositionInputs = false,
}: DefaultModalProps & {
  header?: (onClose: () => void) => ReactNode | null
  body: (onClose: () => void) => ReactNode | null
  footer?: ((onClose: () => void) => ReactNode) | null
  contentClassName?: ClassName
  bodyWrapperClassName?: ClassName
  footerWrapperClassName?: ClassName
  repositionInputs?: boolean
}) {
  const onClose = useCallback(() => {
    onCloseCallback?.()
    setShowModal(false)
  }, [onCloseCallback, setShowModal])

  return (
    <Drawer.Root
      open={showModal}
      onOpenChange={(open) => (open ? null : onClose())}
      repositionInputs={repositionInputs}
    >
      <Drawer.Portal>
        <Drawer.Description>Modal</Drawer.Description>
        <Drawer.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all will-change-auto" />
        <Drawer.Content
          className={`fixed right-0 bottom-0 left-0 mx-auto flex max-h-[98vh] max-w-prose flex-col justify-self-center rounded-t-3xl bg-base-200 outline-none ${contentClassName}`}
        >
          <Drawer.Title className="hidden">Dialog window</Drawer.Title>
          <Drawer.Handle className="mt-4 mb-1 h-1 w-12" />
          <Drawer.Close className="flex w-full flex-row items-center justify-end pr-4 pb-6">
            {header(onClose)}
          </Drawer.Close>

          <div
            className={`relative flex max-h-[80vh] w-screen max-w-prose flex-col gap-y-4 overflow-y-auto px-4 ${bodyWrapperClassName}`}
          >
            {body(onClose)}
          </div>

          {footer ? (
            <div
              className={`px-4 pt-4 pb-safe-bottom ${footerWrapperClassName}`}
            >
              {footer(onClose)}
            </div>
          ) : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
