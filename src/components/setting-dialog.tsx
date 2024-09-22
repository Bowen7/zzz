import { GeneralSetting } from './general-setting'
import { AISetting } from './ai-setting'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/responsive-dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export function SettingDialog({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
          <DialogDescription className="hidden">
            Change the setting
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="general">
          <div className="flex justify-center">
            <TabsList className="w-48 grid grid-cols-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="general">
            <GeneralSetting />
          </TabsContent>
          <TabsContent value="ai">
            <AISetting />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
