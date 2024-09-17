import { atom, createStore } from 'jotai'

export const sidebarOpenedAtom = atom(true)

export const selectedAtom = atom(-1)

export const readIDAtom = atom(-1)

export const userLightningVisibleAtom = atom(false)
export const userTextVisibleAtom = atom(true)
export const assistantTextVisibleAtom = atom(false)

export const deletingAtom = atom({
  id: -1,
  open: false,
})
export const renamingAtom = atom({
  id: -1,
  open: false,
  title: '',
})

export const store = createStore()
