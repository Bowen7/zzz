import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'
import type { ChatModel, ConversationModel } from './types'

const db = new Dexie('SpeakingDB') as Dexie & {
  chats: EntityTable<ChatModel, 'id'>
  conversations: EntityTable<ConversationModel, 'id'>
}

db.version(1).stores({
  chats: '++id, updated',
  conversations: '++id, chat',
})

export {
  db,
}
