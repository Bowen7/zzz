import {
  Lightning as LightningIcon,
  LightningSlash as LightningSlashIcon,
  TextT as TextIcon,
  TextTSlash as TextSlashIcon,
} from '@phosphor-icons/react'
import clsx from 'clsx'
import { useState } from 'react'
import { Toggle } from '@/components/ui/toggle'

type Props = {
  role: 'user' | 'assistant'
  content: string
  suggestion: string
  defaultLightningVisible: boolean
  defaultTextVisible: boolean
}

export const HelpMessage = ({ role, content, suggestion, defaultLightningVisible, defaultTextVisible }: Props) => {
  const [lightningVisible, setLightningVisible] = useState(defaultLightningVisible)
  const [textVisible, setTextVisible] = useState(defaultTextVisible)
  return (
    <>
      {textVisible && <div className={clsx('rounded-lg px-3 py-2', role === 'user' ? 'text-end bg-blue-500 text-white' : 'text-start bg-muted')}>{content}</div>}
      {role === 'user' && lightningVisible && (
        <div className={clsx('rounded-lg px-3 inline-flex items-start space-x-1')}>
          <div className="inline-flex items-center space-x-1">
            <LightningIcon className="w-4 h-4" />
            <span>SUGG: </span>
          </div>
          <span>{suggestion}</span>
        </div>
      )}
      <div className="flex items-center space-x-2">
        {role === 'user' && (
          <Toggle className="w-6 h-6 p-0 inline-flex items-center justify-center" pressed={lightningVisible} onPressedChange={setLightningVisible}>
            {lightningVisible ? <LightningIcon className="w-4 h-4" /> : <LightningSlashIcon className="w-4 h-4" />}
          </Toggle>
        )}
        <Toggle className="w-6 h-6 p-0 inline-flex items-center justify-center" pressed={textVisible} onPressedChange={setTextVisible}>
          {textVisible ? <TextIcon className="w-4 h-4" /> : <TextSlashIcon className="w-4 h-4" />}
        </Toggle>
      </div>
    </>
  )
}
