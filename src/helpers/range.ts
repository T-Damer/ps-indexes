export default function range({
  start = 2.4,
  end = 30,
  step = 0.1,
}: {
  start?: number
  end?: number
  step?: number
} = {}) {
  return Array.from(
    { length: Math.ceil((end - start) / step) + 1 },
    (_, i) => ({ value: parseFloat((start + i * step).toFixed(1)) })
  )
}
