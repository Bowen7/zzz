import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { db } from '@/lib/db'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export function SettingDialog({ open, setOpen }: Props) {
  const [deleteConfirming, setDeleteConfirming] = useState(false)
  const onDelete = async () => {
    if (deleteConfirming) {
      setDeleteConfirming(false)
      await db.delete()
      setOpen(false)
      window.location.reload()
    } else {
      setDeleteConfirming(true)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] h-svh md:h-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
          <DialogDescription>
            Change the setting of the chat.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1">
          <Button variant="destructive" onClick={onDelete}>
            {deleteConfirming ? 'Confirm delete' : 'Delete all chats'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
