import dayjs from 'dayjs'
import { useLiveQuery } from 'dexie-react-hooks'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { db } from '@/lib/db'
import { selectedAtom } from '@/lib/atom'
import type { TempConversationModel } from '@/lib/types'

export const useConversations = () => {
  const selected = useAtomValue(selectedAtom)
  return useLiveQuery(async () => {
    return db.conversations.where('chat').equals(selected).sortBy('id')
  }, [selected]) ?? []
}

export const useAddConversation = (id: number) => {
  const setSelected = useSetAtom(selectedAtom)
  return useCallback(async (conversation: TempConversationModel) => {
    let realId = id
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
    return db.conversations.add({
      ...conversation,
      chat: realId,
    })
  }, [id, setSelected])
}
