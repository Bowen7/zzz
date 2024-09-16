import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUpdateChatTitle } from '@/hooks'
import { renamingAtom } from '@/lib/atom'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export function RenameDialog() {
  const [renaming, setRenaming] = useAtom(renamingAtom)
  const { id, title: originTitle, open } = renaming
  const [title, setTitle] = useState(originTitle)
  const updateTile = useUpdateChatTitle(id)

  useEffect(() => {
    setTitle(originTitle)
  }, [originTitle])

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setRenaming({
        id: -1,
        open: false,
        title: '',
      })
    } else {
      setRenaming(v => ({ ...v, open }))
    }
  }

  const onSave = () => {
    updateTile(title)
    onOpenChange(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
