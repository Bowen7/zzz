import { DeleteDialog } from '@/components/delete-dialog'
import {
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { sidebarOpenedAtom } from '@/lib/atom'
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useAtomValue } from 'jotai'
import type { Chat } from '@/lib/types'

type ChatItemProps = {
  chat: Chat
  selected: number
  onSelect: (id: number) => void
}
const ChatItem = ({ chat, selected, onSelect }: ChatItemProps) => {
  return (
    <div
      className={clsx('hover:bg-secondary px-3 h-9 flex items-center justify-between rounded-md font-medium cursor-pointer group', selected === chat.id ? 'bg-secondary' : '')}
      onClick={() => onSelect(chat.id)}
    >

      <DeleteDialog id={chat?.id ?? -1}>
        <>
          <div>{chat.title}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="w-6 h-6 invisible group-hover:visible">
                <DotsThreeIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16">
              <DropdownMenuItem>
                Rename
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      </DeleteDialog>
    </div>
  )
}

type SidebarProps = {
  selected: number
  chats: Chat[]
  onSelect: (id: number) => void
}

export const Sidebar = ({ selected, chats, onSelect }: SidebarProps) => {
  const opened = useAtomValue(sidebarOpenedAtom)
  return (
    <aside className={clsx('border-r h-full transition-width overflow-hidden flex flex-col', opened ? 'w-64' : 'w-0')}>
      <h1 className="font-bold text-center py-4">Speaking</h1>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-4">
          {chats?.map(chat => (
            <ChatItem
              key={chat.id}
              chat={chat}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
