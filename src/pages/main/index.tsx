import { useMemo } from 'react'
import { ConversationScrollArea } from '@/components/conversation-scroll-area'
import { DeleteDialog } from '@/components/delete-dialog'
import { Header } from '@/components/header'
import { Mic } from '@/components/mic'
import { RenameDialog } from '@/components/rename-dialog'
import { Sidebar } from '@/components/sidebar'
import { AudioReactContext, useAudioProvider } from '@/hooks/use-audio'

export const Main = () => {
  const { audio, currentId, isLoading, isPlaying, audioRef, play, pause } = useAudioProvider()

  const value = useMemo(
    () => ({ currentId, isLoading, isPlaying, audioRef, play, pause }),
    [currentId, isLoading, isPlaying, audioRef, play, pause],
  )
  return (
    <AudioReactContext.Provider value={value}>
      <div className="h-svh overflow-hidden flex font-[family-name:var(--font-geist-sans)] bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <ConversationScrollArea />
          <Mic />
        </div>
        <DeleteDialog />
        <RenameDialog />
        {audio}
      </div>
    </AudioReactContext.Provider>
  )
}
