import Button from 'components/Button'
import goMain from 'helpers/goMain'

export default function ErrorFallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-2">
      <span>Что-то сломалось :(</span>
      <Button
        onClick={() => {
          goMain()
          window.location.reload()
        }}
      >
        Вернуться на главную
      </Button>
    </div>
  )
}
