export type ChatModel = {
  id: number
  title: string
  updated: Date
}

export type ConversationModel = {
  id: number
  chat: number
  userContent: string
  userAudio: ArrayBuffer
  suggestion: string
  assistantContent: string
  assistantAudio: ArrayBuffer | null
}

export type TempConversationModel = {
  userContent: string
  userAudio: ArrayBuffer
  suggestion: string
  assistantContent: string
  assistantAudio: ArrayBuffer | null
}
