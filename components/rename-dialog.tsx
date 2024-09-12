import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUpdateChatTitle } from '@/lib/hooks'
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
