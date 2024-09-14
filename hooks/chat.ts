import { selectedAtom } from '@/lib/atom'
import { db } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'

export const useChats = () => {
  const chats = useLiveQuery(async () => {
    return db.chats.orderBy('updated').reverse().toArray()
  })
  return chats ?? []
}
export const useChat = () => {
  const selected = useAtomValue(selectedAtom)
  return useLiveQuery(async () => {
    return db.chats.get(selected)
  }, [selected]) ?? null
}

export const useUpdateChatTitle = (id: number) =>
  useCallback((title: string) => {
    return db.chats.update(id, { title })
  }, [id])

export const useDeleteChat = (id: number) => {
  const setSelected = useSetAtom(selectedAtom)
  return useCallback(async () => {
    // Delete chat and relative messages
    db.transaction('rw', db.chats, db.messages, async () => {
      return Promise.all([
        db.chats.delete(id),
        db.messages.where('chat').equals(id).delete(),
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
