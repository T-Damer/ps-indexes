import Button from 'components/Button'
import goMain from 'helpers/goMain'
import ArrowLeft from './Icons/ArrowLeft'
import { JSX } from 'preact/jsx-runtime'

export default function ({ right }: { right?: JSX.Element }) {
  return (
    <div className="flex print:hidden items-center justify-between">
      <Button onClick={goMain}>
        <ArrowLeft />
      </Button>
      {right}
    </div>
  )
}
