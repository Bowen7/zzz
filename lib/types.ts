export type Message = {
  id: number
  chat: number
  role: 'user'
  content: string
  blob: Blob
  suggestion: string
  ok: boolean
} | {
  id: number
  chat: number
  role: 'assistant'
  content: string
  blob: Blob | null
}

// Without id and chat
export type TempMessage = {
  role: 'user'
  content: string
  blob: Blob
  ok: boolean
  suggestion: string
} | {
  role: 'assistant'
  content: string
  blob: Blob | null
}

export type Chat = {
  id: number
  title: string
  updated: Date
}
