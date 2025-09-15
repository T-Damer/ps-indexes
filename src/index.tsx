import 'index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from 'App'
import { registerSW } from 'virtual:pwa-register'
import { render } from 'preact'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Доступно обновление 🎉\nПерезагрузить страницу?')) {
      void updateSW(true)
    }
  },
})

render(<App />, document.getElementById('root') as Element)
