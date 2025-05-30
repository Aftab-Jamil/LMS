import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './components/ThemeProvider'
import { Button } from './components/ui/button';

export default function DarkMode() {
    const {setTheme}=useTheme();
  return (
    <DropdownMenu >
    <DropdownMenuTrigger asChild>
    <button variant="outline" size="icon" className='flex justify-center items-center'>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={()=>setTheme("light")}>
            Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setTheme("dark")}>
            Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setTheme("system")}>
            System
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
  )
}
