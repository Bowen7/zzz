import { selectedAtom } from '@/lib/atom'
import { useLiveQuery } from 'dexie-react-hooks'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { db } from './db'
import type { Message } from './types'

export const useChats = () =>
  useLiveQuery(async () => {
    return await db.chats.orderBy('updated').reverse().toArray()
  }) ?? []

export const useChat = (id: number) =>
  useLiveQuery(async () => {
    return await db.chats.get(id)
  }, [id]) ?? null

export const useUpdateChatTitle = (id: number) =>
  useCallback((title: string) => {
    return db.chats.update(id, { title })
  }, [id])

export const useUpdateChatMessages = (id: number) => {
  const [selected, setSelected] = useAtom(selectedAtom)
  return useCallback(async (newMessages: Message[]) => {
    // Create new chat if selected is -1
    if (selected === -1) {
      const id = await db.chats.add({
        messages: newMessages,
        title: 'New Chat',
        updated: new Date(),
      })
      setSelected(id)
    } else {
      const chat = await db.chats.get(id)
      if (!chat) {
        return
      }
      const messages = [...chat.messages, ...newMessages]
      return db.chats.update(id, { messages, updated: new Date() })
    }
  }, [id, selected, setSelected])
}

export const useDeleteChat = (id: number) => {
  const setSelected = useSetAtom(selectedAtom)
  return useCallback(async () => {
    await db.chats.delete(id)
    setSelected(-1)
  }, [id, setSelected])
}

export const useCreateChat = () => {
  const setSelected = useSetAtom(selectedAtom)
  return useCallback(() => {
    setSelected(-1)
  }, [setSelected])
}
