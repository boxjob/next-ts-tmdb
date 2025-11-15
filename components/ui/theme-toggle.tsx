'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
    return (
        <button className='w-5 h-5 relative cursor-pointer' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <Sun className='absolute invisible top-0 text-amber-400 size-5 dark:visible'/>
            <Moon className='absolute visible top-0 text-zinc-400 size-5 dark:invisible' />
        </button>
    )
}
