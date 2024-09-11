export type Message = {
  id: string
  role: 'user'
  content: string
  url: string
} | {
  id: string
  role: 'assistant'
  content: string
  suggestion: string
}

export type Chat = {
  id: number
  title: string
  updated: Date
  messages: Message[]
}
