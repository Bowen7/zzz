import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'
import type { Chat } from './types'

const db = new Dexie('SpeakingDB') as Dexie & {
  chats: EntityTable<Chat, 'id'>
}

db.version(1).stores({
  chats: '++id, updated',
})

export {
  db,
}
