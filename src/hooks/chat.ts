import { useLiveQuery } from 'dexie-react-hooks'
import { useSetAtom } from 'jotai'
import { useCallback, useDeferredValue, useEffect } from 'react'
import { useLatest } from './use-latest'
import { db } from '@/lib/db'
import { isChatsLoadingAtom, selectedAtom } from '@/lib/atom'
import { useConfig } from '@/hooks/use-config'

export const useChats = () => {
  const chats = useLiveQuery(async () => {
    return db.chats.orderBy('updated').reverse().toArray()
  })
  const setSelected = useSetAtom(selectedAtom)
  const setIsChatsLoading = useSetAtom(isChatsLoadingAtom)
  const [config] = useConfig()
  const latestConfig = useLatest(config)
  const deferredChats = useDeferredValue(chats)
  useEffect(() => {
    if (chats && !deferredChats) {
      setIsChatsLoading(false)
      if (chats.length > 0) {
        const { timeToStartNewChat } = latestConfig.current
        const { id, updated } = chats[0]
        // if timeToStartNewChat is 0(never), then we don't need to check the time
        // if timeToStartNewChat + latest chat updated time is greater than current time, then we need to select the latest chat
        if (timeToStartNewChat === 0 || updated.getTime() + timeToStartNewChat * 60 * 1000 > Date.now()) {
          setSelected(id)
        }
      }
    }
  }, [chats, deferredChats, latestConfig, setSelected, setIsChatsLoading])
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
