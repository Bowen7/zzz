import { clsx } from 'clsx'
import { useAtomValue } from 'jotai'
import { ChatList } from './chat-list'
import { sidebarOpenedAtom } from '@/lib/atom'

export const Sidebar = () => {
  const opened = useAtomValue(sidebarOpenedAtom)
  return (
    <aside className={clsx('border-r h-full transition-width overflow-hidden hidden md:block', opened ? 'w-64' : 'w-0')}>
      <div className="w-64 h-full flex flex-col">
        <ChatList />
      </div>
    </aside>
  )
}
