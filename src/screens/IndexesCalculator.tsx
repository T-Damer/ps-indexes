import DetailsHeader from 'components/DetailsHeader'
import DrugCard from 'components/DrugCard'
import LabeledInput from 'components/LabeledInput'
import testsDataStore from 'helpers/atoms/testsDataStore'
import range from 'helpers/range'
import { useAtom } from 'jotai'
import { useState } from 'preact/hooks'

export default function IndexesCalculator({ id }: { id: string }) {
  const [tests, _setTests] = useAtom(testsDataStore)
  const [mass, setMass] = useState(0)

  const _bloodSample = tests[id]

  return (
    <div>
      <DetailsHeader />

      <LabeledInput
        type="number"
        label="Масса тела (кг)"
        value={mass}
        onInput={(e) => setMass(e.currentTarget.valueAsNumber || 0)}
        step="0.01"
      />

      <div className="mt-2 flex flex-row flex-wrap gap-y-2">
        <DrugCard
          drugName="Актрапид"
          mass={mass}
          extraDividend="Желаемая дозировка (ед/кг/ч)"
          dividendOptions={[{ value: 0.05 }, { value: 0.1 }]}
          extraDivisor="Cодержание препарата (Ед)"
          divisorOptions={[{ value: 100 }, { value: 40 }]}
          calc={(mass, dividend, divisor) => (mass * dividend * 24) / divisor}
          modalBody={
            <div className="mb-4">
              <p>
                – Содержание препарата (обычно 100 Ед в 1 мл или 40 Ед в 1 мл)
              </p>
              <p>– Количество физиологического раствора – добавить до 12 мл</p>
              <p>
                – При желаемой дозировке = 0,05 Ед/кг/час скорость введения 0,5
                мл/ч соответствует дозе 0,05 Ед/кг/час (0,1 мл/ч = 0,01 Ед/кг/ч)
              </p>
              <p>
                – При желаемой дозировке = 0,1 Ед/кг/час. Скорость введения 0,5
                мл/ч соответствует дозе 0,1 Ед/кг/час (0,1 мл/ч = 0,02
                Ед/кг/час)
              </p>
            </div>
          }
        />
        <DrugCard
          drugName="Допамин 4%"
          mass={mass}
          calc={(mass) => (mass * 5 * 1440) / 40000}
          modalBody={
            <div className="mb-4">
              <p>– Количество физиологического раствора – добавить до 12 мл</p>
              <p>
                – Скорость введения 0,1 мл/ч соответствует дозе 1 мкг/кг/мин
              </p>
            </div>
          }
        />
        <DrugCard
          drugName="Добутамин 1.25%"
          mass={mass}
          calc={(mass) => (mass * 5 * 1440) / 12500}
          modalBody={
            <div className="mb-4">
              <p>– Количество физиологического раствора – добавить до 12 мл.</p>
              <p>
                – Скорость введения 0,1 мл/ч соответствует дозе 1 мкг/кг/мин.
              </p>
            </div>
          }
        />

        <DrugCard
          drugName="Адреналин 0.1%"
          mass={mass}
          calc={(mass) => (mass * 0.5 * 1440) / 1000}
          modalBody={
            <div className="mb-4">
              <p>– Количество физиологического раствора – добавить до 12 мл.</p>
              <p>
                – Скорость введения 0,1 мл/ч соответствует дозе 0,1 мкг/кг/мин.
              </p>
            </div>
          }
        />

        <DrugCard
          drugName="Норадреналин 0.2%"
          mass={mass}
          calc={(mass) => (mass * 0.5 * 1440) / 2000}
          modalBody={
            <div className="mb-4">
              <p>– Количество Глюкоза 5% – добавить до 12 мл.</p>
              <p>
                – Скорость введения 0,1 мл/ч соответствует дозе 0,1 мкг/кг/мин.
              </p>
            </div>
          }
        />

        <DrugCard
          resultLabel=" доза (мл)"
          drugName="Эсмолол(Бревиблок) 10мг/1мл"
          mass={mass}
          calc={(mass) => (mass * 50 * 1440) / 10000}
          modalBody={
            <div className="mb-4">
              <p>– Разводим NaCl 0,9% до 12,0</p>
              <p>– Скорость 0,1 мл/ч соответствует 10 мкг/кг/мин</p>
              <p>
                – Начальная доза 5-10 мкг/кг/мин. Терапевтическая доза 50-100
                мкг/кг/мин
              </p>
              <p>
                – Инфузия Бревиблока предпочтительно в ЦВК, необходимо
                поддерживать постоянную скорость инфузионной терапии
              </p>
            </div>
          }
        />

        <DrugCard
          drugName="Симдакс(Левосимендан) 2,5мг/мл"
          mass={mass}
          calc={(mass) => (mass * 0.5 * 1440) / 2500}
          modalBody={
            <div className="mb-4">
              <p>– Содержание препарата 2500 мкг в 1 мл.</p>
              <p>– Разводим Глюкозу 5% до 12,0.</p>
              <p>– Скорость 0,1 мл/ч соответствует 0,1 мкг/кг/мин.</p>
              <p>
                – Начальная доза 0,1 мкг/кг/мин. Терапевтическая доза 0,1-0,2
                мкг/кг/мин.
              </p>
              <p>
                – Инфузия Симдакса предпочтительно в ЦВК, необходимо
                поддерживать. постоянную скорость инфузионной терапии
              </p>
            </div>
          }
        />

        <DrugCard
          drugName="Фентанил 0,005%"
          mass={mass}
          calc={(mass) => (mass * 5 * 24) / 50}
          modalBody={
            <div className="mb-4">
              <p>– Содержание препарата 50 мкг в 1 мл.</p>
              <p>– Количество физиологического раствора – добавить до 12 мл.</p>
              <p>– Скорость введения 0,1 мл/ч соответствует дозе 1 мкг/кг/ч.</p>
              <p>– Обычная доза – 3-5 мкг/кг/ч</p>
            </div>
          }
        />

        <DrugCard
          drugName="Морфин 1%"
          mass={mass}
          calc={(mass) => (mass * 20 * 24) / 10000}
          modalBody={
            <div className="mb-4">
              <p>– Содержание препарата в 1 мл. 10 000 мкг.</p>
              <p>– Количество физиологического раствора – добавить до 12 мл.</p>
              <p>
                – Скорость введения 0,5 мл/ч соответствует дозе 20 мкг/кг/ч.
              </p>
              <p>– Доза насыщения – 100-150 мкг/кг/ч.</p>
              <p>– Обычная доза – 10-20 мкг/кг/ч.</p>
            </div>
          }
        />

        <DrugCard
          drugName="Sol. Na Oxybati 20%"
          mass={mass}
          calc={(mass) => (mass * 10 * 24) / 200}
          modalBody={
            <div className="mb-4">
              <p>
                – – Количество физиологического раствора – добавить до 12 мл.
              </p>
              <p>
                – Скорость введения 0,5 мл/ч соответствует дозе 10 (20) мг/кг/ч.
              </p>
              <p>– Обычная доза – 10-20 мг/кг/ч.</p>
            </div>
          }
        />

        <DrugCard
          drugName="Промедол 1% или 2%"
          mass={mass}
          calc={(mass, dividend, divisor) => (mass * dividend * 24) / divisor}
          extraDividend="Доза (мг/кг/ч)"
          dividendOptions={[
            { value: 0.1 },
            { value: 0.125 },
            { value: 0.15 },
            { value: 0.175 },
            { value: 0.2 },
          ]}
          extraDivisor="Концентрация препарата"
          divisorOptions={[
            { value: 10, label: '1%' },
            { value: 20, label: '2%' },
          ]}
          modalBody={
            <div className="mb-4">
              <p>
                – 10 (или 20) определяется концентрацией препарата 1% или 2%
              </p>
              <p>– Количество физиологического раствора – добавить до 12 мл.</p>
              <p>
                – Скорость введения 0,5 мл/ч соответствует дозе 0,1 мг/кг/ч.
              </p>
              <p>– Обычная доза – 0,1-0,2 мг/кг/ч.</p>
            </div>
          }
        />

        <DrugCard
          drugName="Дигоксин 0,025%"
          mass={mass}
          calc={(mass, dividend) => (mass * dividend * 24) / 10}
          extraDividend="Доза (мкг/кг)"
          dividendOptions={[
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 15 },
            { value: 20 },
            { value: 25 },
            { value: 30 },
            { value: 40 },
            { value: 50 },
          ]}
          modalBody={
            <div className="mb-4">
              <p>– Содержание препарата в 1 мл. 0,25 мг (250 мкг)</p>
              <p>– Доза насыщения – 20 мкг/кг/с, доза поддержи 5 мкг/кг/с</p>
              <img
                src="img/digoxyni-dose.png"
                className="my-2"
                alt="Дозировка дигоксина"
              />
            </div>
          }
        />

        <DrugCard
          drugName="Унитиол 1 мл – 50 мг"
          mass={mass}
          calc={(mass) => mass * 5}
          modalBody={
            <div className="mb-4">
              <p>– Доза 5 мг/кг (0,1 мл/кг) в/м или п/к</p>
            </div>
          }
        />

        <DrugCard
          drugName="Вазапростан (Алпростадил)"
          mass={mass}
          calc={(mass, dividend) => mass * dividend}
          extraDividend="Доза 0,005–0,05 мкг/кг/мин"
          dividendOptions={[
            { value: 0.005 },
            { value: 0.01 },
            { value: 0.05 },
            { value: 0.02 },
            { value: 0.025 },
            { value: 0.03 },
            { value: 0.035 },
            { value: 0.04 },
            { value: 0.045 },
            { value: 0.05 },
          ]}
          resultLabel=" (мкг/мин)"
          modalBody={
            <div className="mb-4">
              <p>– 1 ампула – 20 мкг</p>
              <p>– Ампулу разводим до 20 мл. NaCl 0,9%.</p>
              <p>– Скорость введения 0,6 мл/кг/ч = 0,01мкг/кг/мин.</p>
              <p>– Или скорость 0,3 мл/кг/ч = 0,005 мкг/кг/мин.</p>
            </div>
          }
        />

        <DrugCard
          drugName="Эсмерон 1%"
          mass={mass}
          calc={(mass) => (mass * 0.6 * 24) / 10}
          extraDividend="Доза 0,005–0,05 мкг/кг/мин"
          dividendOptions={[
            { value: 0.005 },
            { value: 0.01 },
            { value: 0.05 },
            { value: 0.02 },
            { value: 0.025 },
            { value: 0.03 },
            { value: 0.035 },
            { value: 0.04 },
            { value: 0.045 },
            { value: 0.05 },
          ]}
          modalBody={
            <div className="mb-4">
              <p>– Количество физиологического раствора – добавить до 12 мл.</p>
              <p>
                – Скорость введения 0,5 мл/ч соответствует дозе 0,6 мг/кг/ч.
              </p>
            </div>
          }
        />

        <DrugCard
          drugName="Гидрокарбонат натрия (NaHCO3)"
          mass={mass}
          calc={(mass, dividend, divisor) => (dividend * mass * 0.3) / divisor}
          extraDividend="Дефицит оснований (BE), ммоль/л"
          dividendOptions={range()}
          extraDivisor="Концентрация гидрокарбоната"
          divisorOptions={[
            { value: 0.5, label: '4.2%' },
            { value: 0.6, label: '5%' },
            { value: 1, label: '8.4%' },
          ]}
          modalBody={
            <div className="mb-4">
              <p>– Формула Мелленгаарда–Аструпа</p>
              <p>
                – Скорость введения 0,5 мл/ч соответствует дозе 0,6 мг/кг/ч.
              </p>
            </div>
          }
        />

        <DrugCard
          drugName="Глюкозо-инсулиновая инфузия"
          mass={mass}
          calc={(mass) => mass * 5}
          resultLabel=" (мл) Глюкозы 10% + 0,2ЕД инсулина"
          modalBody={
            <div className="mb-4">
              <p>– 0,2 ЕД инсулина + 0,5 г/кг (5 мл/кг) Глюкозы 10%</p>
              <p>– в/в капельно со скоростью 2-4 мл/кг/ч.</p>
            </div>
          }
        />

        <DrugCard
          drugName="Канеовит (Витамин К)"
          mass={mass}
          calc={(mass) => (mass > 2.5 ? 0.1 : 0.04 * mass)}
          modalBody={
            <div className="mb-4">
              <p>– Масса тела более 2500 г – 0,1 мг (0,1мл.).</p>
              <p>– Масса тела менее 2500 г – 0,04 мг/кг (0,04 мл/кг).</p>
            </div>
          }
        />
      </div>
    </div>
  )
}
