import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useConfig } from '@/hooks/use-config'
import { voiceList } from '@/lib/voice-list'

export const AISetting = () => {
  const [config, setConfig] = useConfig()
  const { voiceId } = config
  return (
    <div className="flex-1 pt-2 space-y-4">
      <Label className="grid grid-cols-7 items-center gap-4">
        <span className="col-span-2 text-right">TTS Voice:</span>
        <div className="col-span-5">
          <Select value={voiceId} onValueChange={value => setConfig('voiceId', value)}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {voiceList.map(({ id, name, gender, language }) => (
                  <SelectItem key={id} value={id}>
                    {`${language}, ${name}, ${gender}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Label>
    </div>
  )
}
