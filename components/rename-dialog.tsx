import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUpdateChatTitle } from '@/hooks'
import { useState } from 'react'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  id: number
  originTitle: string
}
export function RenameDialog({ open, setOpen, id, originTitle }: Props) {
  const [title, setTitle] = useState(originTitle)
  const updateTile = useUpdateChatTitle(id)

  const onSave = () => {
    updateTile(title)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename chat title</DialogTitle>
          <DialogDescription>
            You can rename the chat title to make it easier to identify.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={title === originTitle || !title.trim()}
            onClick={onSave}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
