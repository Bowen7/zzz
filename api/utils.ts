export type OK<T> = {
  ok: true
  data: T
}

export type Err = {
  ok: false
  message: string
}

export type Result<T> = OK<T> | Err

export const ok = <T>(data: T): OK<T> => ({
  ok: true,
  data,
})

export const err = (message: string): Err => ({
  ok: false,
  message,
})
