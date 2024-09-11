import { DeleteDialog } from '@/components/delete-dialog'
import {
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { sidebarOpenedAtom } from '@/lib/atom'
import { useCreateChat } from '@/lib/hooks'
import { Plus as PlusIcon, Sidebar as SidebarIcon, Trash as TrashIcon } from '@phosphor-icons/react'
import { useSetAtom } from 'jotai'
import type { Chat } from '@/lib/types'

type Props = {
  chat: Chat | null
}
export const Header = ({ chat }: Props) => {
  const setSidebarOpened = useSetAtom(sidebarOpenedAtom)

  const createChat = useCreateChat()

  return (
    <div className="h-14 border-b flex items-center justify-between px-4 space-x-2">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setSidebarOpened(v => !v)}>
          <SidebarIcon className="h-4 w-4" />
        </Button>
        <div className="font-medium">{chat?.title}</div>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={createChat}>
          <PlusIcon className="h-4 w-4" />
        </Button>
        <DeleteDialog id={chat?.id ?? -1}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" disabled={!chat} size="icon" className="w-8 h-8">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
        </DeleteDialog>
      </div>
    </div>
  )
}
