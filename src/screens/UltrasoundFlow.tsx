import Button from 'components/Button'
import DetailsHeader from 'components/DetailsHeader'
import LabeledInput from 'components/LabeledInput'
import { useEffect, useState } from 'preact/hooks'

const href =
  'https://cyberleninka.ru/article/n/rol-ehokardiografii-vypolnennoy-neonatologom-pri-otsenke-i-lechenii-shoka-u-novorozhdennyh'

function ArticleButton() {
  return (
    <Button>
      <a href={href} target="_blank" className="no-underline">
        <span className="font-bold">Статья</span>
      </a>
    </Button>
  )
}

export default function UltrasoundFlow() {
  const [diameter, setDiameter] = useState(0)
  const [result, setResult] = useState(0)
  const [vti, setVti] = useState(0)
  const [pulse, setPulse] = useState(0)
  const [mass, setMass] = useState(0)

  useEffect(() => {
    const circumference = (Math.PI * (diameter / 2)) ^ 2
    const res = (circumference * vti * pulse) / mass
    const rounded = Math.round(res * 1000) / 1000

    setResult(rounded || 0)
  }, [diameter, vti, pulse, mass])

  return (
    <div className="flex flex-col">
      <DetailsHeader right={<ArticleButton />} />
      <div className="flex flex-row gap-x-2 items-center mt-4">
        <div className="flex flex-col gap-y-4 w-full">
          <LabeledInput
            type="number"
            label="Диаметр сосуда (см)"
            value={diameter}
            onInput={(e) => setDiameter(e.currentTarget.valueAsNumber || 0)}
            step="0.01"
          />
          <LabeledInput
            type="number"
            label="Интеграл скорости кровотока (VTI) (см)"
            placeholder="Расстояние тока крови за 1 сердечный выбор"
            value={vti}
            onInput={(e) => setVti(e.currentTarget.valueAsNumber || 0)}
          />
          <LabeledInput
            type="number"
            label="ЧСС / минуту"
            value={pulse}
            onInput={(e) => setPulse(e.currentTarget.valueAsNumber || 0)}
          />
          <LabeledInput
            type="number"
            label="Масса тела (кг)"
            value={mass}
            onInput={(e) => setMass(e.currentTarget.valueAsNumber || 0)}
          />
        </div>

        <div className="flex flex-col gap-y-2 min-w-32 text-center">
          <span>Коровоток</span>
          <span>(мл/кг/мин)</span>
          <span className="text-xl font-bold">{result}</span>
        </div>
      </div>
    </div>
  )
}
