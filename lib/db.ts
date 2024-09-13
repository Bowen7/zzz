import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'
import type { Chat, Message } from './types'

const db = new Dexie('SpeakingDB') as Dexie & {
  chats: EntityTable<Chat, 'id'>
  messages: EntityTable<Message, 'id'>
}

db.version(1).stores({
  chats: '++id, updated',
  messages: '++id, chat',
})

export {
  db,
}
