import Button from 'components/Button'
import goMain from 'helpers/goMain'
import { JSX } from 'preact/jsx-runtime'
import ArrowLeft from './Icons/ArrowLeft'

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
