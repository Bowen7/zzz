import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { ChatList } from './chat-list'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export const ChatListDrawer = ({ open, onOpenChange }: Props) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerHeader className="hidden">
        <DrawerTitle>Speak Now</DrawerTitle>
        <DrawerDescription>Choose a chat</DrawerDescription>
      </DrawerHeader>
      <DrawerContent className="pb-4">
        <div className="h-1/3 flex flex-col">
          <ChatList />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
