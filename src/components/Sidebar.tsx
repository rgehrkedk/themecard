// components/Sidebar.tsx
"use client"

import { useState, useEffect } from "react"
import { MenuIcon, X } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      setIsOpen(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md hover:bg-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 transition-transform duration-300
          backdrop-blur-md bg-background/80 border-r
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Scrollable content container */}
        <div className="h-full w-full overflow-y-auto px-4 py-8">
          {/* Logo or Brand */}
          <div className="flex items-center mb-8 px-2">
            <h2 className="text-2xl font-bold">Your Brand</h2>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <NavItem href="#" isActive>Dashboard</NavItem>
            <NavItem href="#">Projects</NavItem>
            <NavItem href="#">Tasks</NavItem>
            <NavItem href="#">Calendar</NavItem>
            <NavItem href="#">Reports</NavItem>
          </nav>

          {/* User Section */}
          <div className="absolute bottom-8 left-4 right-4">
            <div className="flex items-center p-4 rounded-lg bg-secondary/50 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-primary/10" />
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

// Navigation Item Component
function NavItem({ 
  href, 
  children, 
  isActive 
}: { 
  href: string
  children: React.ReactNode
  isActive?: boolean 
}) {
  return (
    <a
      href={href}
      className={`
        flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium
        transition-colors hover:bg-accent
        ${isActive ? 'bg-secondary/50 text-secondary-foreground' : ''}
      `}
    >
      {children}
    </a>
  )
}