import ErrorFallback from 'components/ErrorFallback'
import Footer from 'components/Footer'
import useTheme from 'hooks/useTheme'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'
import IndexesCalculator from 'screens/IndexesCalculator'
import Main from 'screens/Main'
import { Route, Router, Switch } from 'wouter-preact'
import { useHashLocation } from 'wouter-preact/use-hash-location'

declare global {
  interface Window {
    TelegramWebviewProxy: unknown
    TelegramWebviewProxyProto: unknown
    TelegramWebview: unknown
  }
}

export default function () {
  const theme = useTheme()

  if (
    window.TelegramWebviewProxy ||
    window.TelegramWebviewProxyProto ||
    window.TelegramWebview
  )
    return (
      <div className="prose container mx-auto flex h-[100dvh] flex-col justify-center px-4 font-bold">
        <p>
          Пожалуйста используйте браузерную версию приложения, телеграм не
          позволяет сохранять файлы
        </p>
        <p>Для этого нажмите три точки сверху справа и "Открыть в" браузере</p>
        <p>
          Истории сохраненные в телеграме не переносятся в браузер и ими нельзя
          поделиться
        </p>
      </div>
    )

  return (
    <div className="prose container mx-auto my-5 flex min-h-[100dvh] flex-col px-5 md:p-10 print:w-full">
      <Router hook={useHashLocation}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Switch>
            <Route
              path="/test/:id"
              component={({ params }: { params: { id: string } }) => (
                <IndexesCalculator id={params.id} />
              )}
            />
            <Route component={Main} />
          </Switch>
          <Footer />
        </ErrorBoundary>
      </Router>
      <ToastContainer theme={theme} />
    </div>
  )
}
