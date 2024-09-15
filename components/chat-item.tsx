import { DeleteDialog } from '@/components/delete-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { selectedAtom } from '@/lib/atom'
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useAtom } from 'jotai'
import { useState } from 'react'
import type { Chat } from '@/lib/types'
import { RenameDialog } from './rename-dialog'

type Props = {
  chat: Chat
}
export const ChatItem = ({ chat }: Props) => {
  const { id, title } = chat
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selected, setSelected] = useAtom(selectedAtom)
  return (
    <div
      className={clsx('md:hover:bg-accent px-3 h-9 flex items-center justify-between rounded-md font-medium cursor-pointer group', selected === chat.id ? 'bg-accent' : '')}
      onClick={() => setSelected(chat.id)}
    >
      <div>{title}</div>
      {id !== -1 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-6 h-6 invisible md:group-hover:visible hover:bg-background bg-accent"
            >
              <DotsThreeIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-16">
            <DropdownMenuItem onClick={() => setRenameDialogOpen(true)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <DeleteDialog
        id={id}
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
      />
      <RenameDialog
        originTitle={title}
        id={id}
        open={renameDialogOpen}
        setOpen={setRenameDialogOpen}
      />
    </div>
  )
}
