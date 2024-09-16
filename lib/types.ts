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

export type ChatModel = {
  id: number
  title: string
  updated: Date
}

export type ConversationModel = {
  id: number
  chat: number
  userContent: string
  userBlob: Blob
  suggestion: string
  assistantContent: string
  assistantBlob: Blob | null
}

export type TempConversationModel = {
  userContent: string
  userBlob: Blob
  suggestion: string
  assistantContent: string
  assistantBlob: Blob | null
}
