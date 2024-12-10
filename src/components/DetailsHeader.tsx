import Button from 'components/Button'
import goMain from 'helpers/goMain'
import ArrowLeft from './Icons/ArrowLeft'

export default function () {
  return (
    <div className="flex print:hidden">
      <Button onClick={goMain}>
        <ArrowLeft />
      </Button>
    </div>
  )
}
