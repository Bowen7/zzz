import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deletingAtom, renamingAtom, selectedAtom } from '@/lib/atom'
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useAtom, useSetAtom } from 'jotai'
import type { ChatModel } from '@/lib/types'

type Props = {
  chat: ChatModel
}
export const Chat = ({ chat }: Props) => {
  const { id, title } = chat
  const [selected, setSelected] = useAtom(selectedAtom)
  const setDeleting = useSetAtom(deletingAtom)
  const setRenaming = useSetAtom(renamingAtom)
  const onRename = () => {
    setRenaming({
      id,
      open: true,
      title,
    })
  }
  const onDelete = () => {
    setDeleting({
      id,
      open: true,
    })
  }
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
            <DropdownMenuItem onClick={onRename}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
