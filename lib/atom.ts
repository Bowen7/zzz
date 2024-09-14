import { atom, createStore } from 'jotai'

export const sidebarOpenedAtom = atom(true)

export const selectedAtom = atom(-1)

export const readIDAtom = atom(-1)

export const userLightningVisibleAtom = atom(false)
export const userTextVisibleAtom = atom(false)
export const assistantTextVisibleAtom = atom(false)

export const store = createStore()
