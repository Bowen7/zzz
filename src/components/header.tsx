import { DotsThreeCircle as DotsThreeCircleIcon, List as ListIcon, Plus as PlusIcon, Sidebar as SidebarIcon } from '@phosphor-icons/react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { ChatListDrawer } from './chat-list-drawer'
import { SettingDialog } from './setting-dialog'
import { NEW_CHAT } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useChat, useCreateChat } from '@/hooks'
import { deletingAtom, renamingAtom, selectedAtom, sidebarOpenedAtom } from '@/lib/atom'

export const Header = () => {
  const [settingOpen, setSettingOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const setDeleting = useSetAtom(deletingAtom)
  const setRenaming = useSetAtom(renamingAtom)
  const selected = useAtomValue(selectedAtom)
  const chat = useChat(selected) ?? NEW_CHAT
  const isDesktop = useMediaQuery('(min-width: 768px)', { initializeWithValue: false })
  const setSidebarOpened = useSetAtom(sidebarOpenedAtom)
  const createChat = useCreateChat()
  const { id, title } = chat

  const onDelete = () => {
    setDeleting({
      id,
      open: true,
    })
  }
  const onRename = () => {
    setRenaming({
      id,
      open: true,
      title,
    })
  }
  return (
    <div className="h-14 border-b flex items-center justify-between px-4 space-x-2">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="w-8 h-8 hidden md:inline-flex" onClick={() => setSidebarOpened(v => !v)}>
          <SidebarIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 md:hidden" onClick={() => setDrawerOpen(true)}>
          <ListIcon className="h-4 w-4" />
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
              onClick={onRename}
            >
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={id === -1}
              onClick={onDelete}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSettingOpen(true)}>
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isDesktop && <ChatListDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />}
      <SettingDialog open={settingOpen} setOpen={setSettingOpen} />
    </div>
  )
}
