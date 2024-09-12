import { atom, createStore } from 'jotai'

export const sidebarOpenedAtom = atom(true)

export const selectedAtom = atom(-1)

export const readIDAtom = atom('')

export const store = createStore()
