import { useLocalStorage } from 'usehooks-ts'
import { useCallback, useMemo } from 'react'
import type { Config } from '@/lib/types'

const DEFAULT_CONFIG: Config = {
  voiceId: 'en-IN-NeerjaNeural',
  timeToStartNewChat: 0,
  chatId: -1,
}

export const useConfig = () => {
  const [storageConfig, setStorageConfig] = useLocalStorage<Config>(
    'config',
    DEFAULT_CONFIG,
  )

  const config = useMemo(() => ({
    ...DEFAULT_CONFIG,
    ...storageConfig,
  }), [storageConfig])

  const setConfig = useCallback((key: keyof Config, value: Config[keyof Config]) => {
    setStorageConfig(prev => ({ ...prev, [key]: value }))
  }, [setStorageConfig])

  return [config, setConfig] as [Config, typeof setConfig]
}
