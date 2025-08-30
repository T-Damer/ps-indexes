export default function () {
  const href = 'https://github.com/T-Damer'

  return (
    <footer className="mt-2 flex h-full w-full flex-1 items-end justify-center">
      <span className="block print:hidden">
        Made by{' '}
        <a href={href} target="_blank" rel="noreferrer">
          T-Damer
        </a>{' '}
        <b>Σ</b> {new Date().getFullYear()}
      </span>
      <span className="hidden print:block">
        <a href={href}>{href}</a>
      </span>
    </footer>
  )
}
