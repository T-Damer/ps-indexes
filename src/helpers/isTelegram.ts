declare global {
  interface Window {
    TelegramWebviewProxy: unknown
    TelegramWebviewProxyProto: unknown
    TelegramWebview: unknown
    Telegram: unknown
  }
}

export function isTelegram() {
  return (
    window.TelegramWebviewProxy ||
    window.TelegramWebviewProxyProto ||
    window.TelegramWebview ||
    window.Telegram
  )
}
