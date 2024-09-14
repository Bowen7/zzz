import { selectedAtom } from '@/lib/atom'
import { db } from '@/lib/db'
import dayjs from 'dayjs'
import { useLiveQuery } from 'dexie-react-hooks'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import type { TempMessage } from '@/lib/types'

export const useChatMessages = () => {
  const selected = useAtomValue(selectedAtom)
  return useLiveQuery(async () => {
    return db.messages.where('chat').equals(selected).sortBy('id')
  }, [selected]) ?? []
}

export const useAddMessages = (id: number) => {
  const setSelected = useSetAtom(selectedAtom)
  return useCallback(async (messages: TempMessage[]) => {
    let realId = id
    if (!Array.isArray(messages)) {
      messages = [messages]
    }
    // Create new chat if selected is -1
    if (id === -1) {
      realId = await db.chats.add({
        title: `Chat ${dayjs().format('MM-DD HH:mm')}`,
        updated: new Date(),
      })
      setSelected(realId)
    } else {
      await db.chats.update(id, { updated: new Date() })
    }
    return db.messages.bulkAdd(messages.map(message => ({
      ...message,
      chat: realId,
    })))
  }, [id, setSelected])
}

export const useSetMessageBlob = (id: number) =>
  useCallback((blob: Blob) => db.messages.update(id, { blob }), [id])
