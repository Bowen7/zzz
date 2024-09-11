import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback, useEffect, useState } from 'react'
import { db } from './db'
import type { Chat, Message } from './types'

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

export const useUpdateChatMessages = (id: number) =>
  useCallback((messages: Message[]) => {
    return db.chats.update(id, { messages, updated: new Date() })
  }, [id])

export const useDeleteChat = (id: number) =>
  useCallback(() => {
    return db.chats.delete(id)
  }, [id])

export const useSelect = (chats: Chat[]) => {
  const [selected, setSelected] = useState<number>(-1)
  const onSelect = useCallback((id: number) => {
    setSelected(id)
  }, [])

  useEffect(() => {
    if (chats.length > 0) {
      if (selected === -1 || !chats.find(chat => chat.id === selected)) {
        setSelected(chats[0].id)
      }
    }
  }, [selected, chats])
  return { selected, onSelect }
}

export const useCreateChat = () =>
  useCallback(async () => {
    return await db.chats.add({
      messages: [],
      title: 'New Chat',
      updated: new Date(),
    })
  }, [])
