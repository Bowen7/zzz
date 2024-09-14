import { readIDAtom, selectedAtom } from '@/lib/atom'
import { EdgeSpeechTTS } from '@lobehub/tts'
import dayjs from 'dayjs'
import { useLiveQuery } from 'dexie-react-hooks'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useRef } from 'react'
import { db } from './db'
import { responseSchema } from './schema'
import type { TempMessage } from './types'

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

export const useChatMessages = () => {
  const selected = useAtomValue(selectedAtom)
  return useLiveQuery(async () => {
    return db.messages.where('chat').equals(selected).sortBy('id')
  }, [selected]) ?? []
}

export const useUpdateChatTitle = (id: number) =>
  useCallback((title: string) => {
    return db.chats.update(id, { title })
  }, [id])

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

export const useTTS = () =>
  useCallback(async (id: number, text: string) => {
    const tts = new EdgeSpeechTTS()
    const response = await tts.create({
      input: text,
      options: {
        voice: 'en-IN-NeerjaNeural',
      },
    })
    const blob = await response.blob()
    await db.messages.update(id, { blob })
  }, [])

export const useSubmit = () => {
  const selected = useAtomValue(selectedAtom)
  const setReadID = useSetAtom(readIDAtom)
  const addMessages = useAddMessages(selected)
  const tts = useTTS()
  return useCallback(async (blob: Blob) => {
    const formData = new FormData()
    formData.append('input', blob, 'audio.mp3')
    const messages = await db.messages.where('chat').equals(selected).sortBy('id') ?? []
    for (const message of messages) {
      formData.append('messages', JSON.stringify({
        role: message.role,
        content: message.content,
      }))
    }
    const response = await fetch('/api', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    const parsed = responseSchema.safeParse(data)
    if (parsed.success) {
      const { peer, text } = parsed.data
      const { ok, content, suggestion } = peer
      if (ok) {
        const id = await addMessages([
          { role: 'user', content: text, blob, ok: true, suggestion },
          { role: 'assistant', content, blob: null },
        ])
        setReadID(id)
        await tts(id, content)
      } else {
        await addMessages([
          { role: 'user', content: text, blob, ok: false, suggestion },
        ])
      }
    }
  }, [addMessages, selected, tts, setReadID])
}

export const useLatest = <T>(value: T) => {
  const ref = useRef(value)
  ref.current = value
  return ref
}
