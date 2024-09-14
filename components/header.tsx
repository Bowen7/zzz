import { DeleteDialog } from '@/components/delete-dialog'
import { newChat } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { sidebarOpenedAtom } from '@/lib/atom'
import { useChat, useCreateChat } from '@/lib/hooks'
import { DotsThreeCircle as DotsThreeCircleIcon, Plus as PlusIcon, Sidebar as SidebarIcon, Trash as TrashIcon } from '@phosphor-icons/react'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { SettingDialog } from './setting-dialog'

export const Header = () => {
  const [settingOpen, setSettingOpen] = useState(false)
  const chat = useChat() ?? newChat
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
            >
              <DotsThreeCircleIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-12">
            <DropdownMenuItem
              disabled={id === -1}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSettingOpen(true)}>
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DeleteDialog id={id} open={deleteDialogOpen} setOpen={setDeleteDialogOpen} />
      <SettingDialog open={settingOpen} setOpen={setSettingOpen} />
    </div>
  )
}
