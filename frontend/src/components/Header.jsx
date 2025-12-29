import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Search, User, BarChart3, Menu, X } from 'lucide-react'
import gsap from 'gsap'

const Header = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const drawerRef = useRef(null)
  const overlayRef = useRef(null)

  // Swipe tracking
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  ]

  const isActive = (path) => location.pathname === path

  const NavContent = () => (
    <>
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive(path)
            ? 'bg-black text-white'
            : 'hover:bg-gray-200'
            }`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </Link>
      ))}
    </>
  )

  /* GSAP animations */
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'auto',
      })

      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.45, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none',
      })

      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      })
    }
  }, [isOpen])

  /* Swipe handlers */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchEndX.current - touchStartX.current > 80) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b px-2">
        <div className="flex p-2 justify-between items-center">
          <div className="font-bold">Logo</div>

          <div className="hidden md:flex gap-3">
            <NavContent />
          </div>

          <div className="flex items-center gap-2">
            <Link to="/profile">
              <div className="hidden md:flex h-10 w-10 items-center justify-center hover:bg-gray-200 rounded-full">
                <User />
              </div>
            </Link>

            <div className="md:hidden">
              <Menu onClick={() => setIsOpen(true)} />
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="
    fixed inset-0 z-40
    bg-black/30
    backdrop-blur-[2px]
    opacity-0 pointer-events-none
  "
      />


      {/* Drawer */}
      <div
        ref={drawerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed top-0 right-0 h-screen w-64 bg-white border-l z-50"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex justify-end p-4">
          <X onClick={() => setIsOpen(false)} />
        </div>

        <div className="flex flex-col gap-4 px-6">
          <NavContent />
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex gap-2 items-center px-2 hover:bg-gray-200 py-2 rounded"
          >
            <User />
            <p>Profile</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
