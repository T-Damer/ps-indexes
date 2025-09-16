export function isTelegram() {
  if (typeof navigator === 'undefined') return false
  return /Telegram/i.test(navigator.userAgent)
}
