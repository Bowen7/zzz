import {
  Dialog,
  DialogAction,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/responsive-dialog'
import { buttonVariants } from '@/components/ui/button'
import { useDeleteChat } from '@/hooks'
import { deletingAtom } from '@/lib/atom'
import { useAtom } from 'jotai'

export const DeleteDialog = () => {
  const [deleting, setDeleting] = useAtom(deletingAtom)
  const { id, open } = deleting

  const deleteChat = useDeleteChat(id)

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setDeleting({
        id: -1,
        open: false,
      })
    } else {
      setDeleting(v => ({ ...v, open }))
    }
  }

  const onDelete = () => {
    deleteChat()
    onOpenChange(false)
  }

  return (
    <Dialog
      alert
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Chat?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogCancel>Cancel</DialogCancel>
          <DialogAction
            onClick={onDelete}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Continue
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
