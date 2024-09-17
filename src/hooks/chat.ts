import { useLiveQuery } from 'dexie-react-hooks'
import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { db } from '@/lib/db'
import { selectedAtom } from '@/lib/atom'

export const useChats = () => {
  const chats = useLiveQuery(async () => {
    return db.chats.orderBy('updated').reverse().toArray()
  })
  return chats ?? []
}
export const useChat = (id: number) => {
  return useLiveQuery(async () => {
    return db.chats.get(id)
  }, [id]) ?? null
}

export const useUpdateChatTitle = (id: number) =>
  useCallback((title: string) => {
    return db.chats.update(id, { title })
  }, [id])

export const useDeleteChat = (id: number) => {
  const setSelected = useSetAtom(selectedAtom)
  return useCallback(async () => {
    // Delete chat and relative conversations
    db.transaction('rw', db.chats, db.conversations, async () => {
      return Promise.all([
        db.chats.delete(id),
        db.conversations.where('chat').equals(id).delete(),
      ])
    })
    setSelected(-1)
  }, [id, setSelected])
}

// Don't insert data to db
// just set selected to -1
export const useCreateChat = () => {
  const setSelected = useSetAtom(selectedAtom)
  return useCallback(() => {
    setSelected(-1)
  }, [setSelected])
}
