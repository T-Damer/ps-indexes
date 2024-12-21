import DrugJar from 'components/Icons/DrugJar'
import Ultrasound from 'components/Icons/Ultrasound'

export const locations = {
  drugs: 'drugs',
  ultrasound: 'ultrasound',
}

export const availablePages = [
  {
    title: 'Калькулятор препартов',
    location: locations.drugs,
    icon: DrugJar,
  },
  {
    title: 'Сердечный выброс по ЭХОкг',
    location: locations.ultrasound,
    icon: Ultrasound,
  },
]
