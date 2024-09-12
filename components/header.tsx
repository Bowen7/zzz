import { DeleteDialog } from '@/components/delete-dialog'
import { Button } from '@/components/ui/button'
import { sidebarOpenedAtom } from '@/lib/atom'
import { useCreateChat } from '@/lib/hooks'
import { Plus as PlusIcon, Sidebar as SidebarIcon, Trash as TrashIcon } from '@phosphor-icons/react'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import type { Chat } from '@/lib/types'

type Props = {
  chat: Chat
}
export const Header = ({ chat }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const setSidebarOpened = useSetAtom(sidebarOpenedAtom)
  const createChat = useCreateChat()
  const { id, title } = chat

  return (
    <div className="h-14 border-b flex items-center justify-between px-4 space-x-2">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setSidebarOpened(v => !v)}>
          <SidebarIcon className="h-4 w-4" />
        </Button>
        <div className="font-medium">{title}</div>
      </div>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          disabled={id === -1}
          onClick={createChat}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          disabled={id === -1}
          size="icon"
          className="w-8 h-8"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <DeleteDialog id={id} open={deleteDialogOpen} setOpen={setDeleteDialogOpen} />
    </div>
  )
}
