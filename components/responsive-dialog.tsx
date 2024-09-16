import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog as UIDialog,
  DialogContent as UIDialogContent,
  DialogDescription as UIDialogDescription,
  DialogFooter as UIDialogFooter,
  DialogHeader as UIDialogHeader,
  DialogTitle as UIDialogTitle,
  DialogTrigger as UIDialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { createContext, useContext, useMemo } from 'react'
import { useMediaQuery } from 'usehooks-ts'

const DialogContext = createContext<{
  isDesktop: boolean
  alert: boolean
}>({
  isDesktop: true,
  alert: false,
})

const DIALOG = {
  Dialog: {
    alert: AlertDialog,
    default: UIDialog,
    mobile: Drawer,
  },
  Content: {
    alert: AlertDialogContent,
    default: UIDialogContent,
    mobile: DrawerContent,
  },
  Trigger: {
    alert: AlertDialogTrigger,
    default: UIDialogTrigger,
    mobile: DrawerTrigger,
  },
  Title: {
    alert: AlertDialogTitle,
    default: UIDialogTitle,
    mobile: DrawerTitle,
  },
  Description: {
    alert: AlertDialogDescription,
    default: UIDialogDescription,
    mobile: DrawerDescription,
  },
  Footer: {
    alert: AlertDialogFooter,
    default: UIDialogFooter,
    mobile: DrawerFooter,
  },
  Header: {
    alert: AlertDialogHeader,
    default: UIDialogHeader,
    mobile: DrawerHeader,
  },
}

const getType = (isDesktop: boolean, alert: boolean) => {
  if (isDesktop) {
    return alert ? 'alert' : 'default'
  }
  return 'mobile'
}

const useType = () => {
  const { isDesktop, alert } = useContext(DialogContext)
  return getType(isDesktop, alert)
}

type DialogProps = {
  alert?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}
export const Dialog = ({ alert = false, ...props }: DialogProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)', { initializeWithValue: false })
  const Comp = DIALOG.Dialog[getType(isDesktop, alert)]
  const value = useMemo(() => ({ isDesktop, alert }), [isDesktop, alert])
  return (
    <DialogContext.Provider value={value}>
      <Comp {...props} />
    </DialogContext.Provider>
  )
}

export const DialogTrigger = (props: React.ComponentPropsWithoutRef<typeof UIDialogTrigger>) => {
  const type = useType()
  const Comp = DIALOG.Trigger[type]
  return <Comp {...props} />
}

export const DialogContent = (props: { children: React.ReactNode, className?: string }) => {
  const type = useType()
  const Comp = DIALOG.Content[type]
  const { children, ...rest } = props
  const resultChildren = type === 'mobile' ? <div className="p-4">{children}</div> : children
  return <Comp {...rest}>{resultChildren}</Comp>
}

export const DialogTitle = (props: React.ComponentPropsWithoutRef<typeof UIDialogTitle>) => {
  const type = useType()
  const Comp = DIALOG.Title[type]
  return <Comp {...props} />
}

export const DialogDescription = (props: React.ComponentPropsWithoutRef<typeof UIDialogDescription>) => {
  const type = useType()
  const Comp = DIALOG.Description[type]
  return <Comp {...props} />
}

export const DialogFooter = (props: React.ComponentPropsWithoutRef<typeof UIDialogFooter>) => {
  const type = useType()
  const Comp = DIALOG.Footer[type]
  return <Comp {...props} />
}

export const DialogHeader = (props: React.ComponentPropsWithoutRef<typeof UIDialogHeader>) => {
  const type = useType()
  const Comp = DIALOG.Header[type]
  return <Comp {...props} />
}

export const DialogAction = (props: React.ComponentPropsWithoutRef<typeof AlertDialogAction>) => {
  const type = useType()
  if (type === 'default') {
    return null
  }
  if (type === 'alert') {
    return <AlertDialogAction {...props} />
  }
  return <Button {...props} />
}

export const DialogCancel = (props: React.ComponentPropsWithoutRef<typeof AlertDialogCancel>) => {
  const type = useType()
  if (type === 'default') {
    return null
  }
  if (type === 'alert') {
    return <AlertDialogCancel {...props} />
  }
  return <DrawerClose {...props} />
}
