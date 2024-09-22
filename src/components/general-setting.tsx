import { useEffect, useRef, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useConfig } from '@/hooks/use-config'

export const GeneralSetting = () => {
  const [config, setConfig] = useConfig()
  const { timeToStartNewChat } = config
  const [isDeleting, setIsDeleting] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  const onDelete = async () => {
    setIsDeleting(true)
    timer.current = setTimeout(() => {
      setIsDeleting(false)
    }, 5000)
  }

  const onDeleteConfirm = async () => {
    setIsDeleting(false)
    await db.delete()
    window.location.reload()
  }

  return (
    <div className="flex-1 pt-2 space-y-4">
      <Label className="grid grid-cols-5 items-center gap-4">
        <span className="col-span-2 text-right">Start new chat:</span>
        <div className="col-span-3">
          <Select
            value={timeToStartNewChat.toString()}
            onValueChange={value => setConfig('timeToStartNewChat', Number.parseInt(value))}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Never</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="1440">1 day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Label>
      <Label className="grid grid-cols-5 items-center gap-4">
        <span className="col-span-2 text-right">Delete all chats:</span>
        <div className="col-span-3">
          <Button
            variant="destructive"
            onClick={isDeleting ? onDeleteConfirm : onDelete}
            size="sm"
          >
            {isDeleting ? 'Confirm' : 'Delete'}
          </Button>
        </div>
      </Label>
    </div>
  )
}
