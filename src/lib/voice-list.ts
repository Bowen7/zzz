export type Voice = {
  id: string
  name: string
  gender: 'male' | 'female'
  language: string
}

export const voiceList: Voice[] = [
  { id: 'en-IN-NeerjaNeural', name: 'Neerja', gender: 'female', language: 'English (Indian)' },
  { id: 'en-IN-PrabhatNeural', name: 'Prabhat', gender: 'male', language: 'English (Indian)' },
]
