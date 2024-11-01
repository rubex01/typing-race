import { vi } from 'vitest'

export default (fn) => {
  return vi.fn(fn)
}
