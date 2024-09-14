import { readIDAtom, selectedAtom } from '@/lib/atom'
import { db } from '@/lib/db'
import { responseSchema } from '@/lib/schema'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { useAddMessages } from './message'
import { useTTS } from './use-tts'

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
