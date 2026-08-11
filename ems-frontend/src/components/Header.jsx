import React from 'react'

const Header = () => {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center" id="navbar">
        <a className="text-white font-bold text-xl tracking-tight hover:text-slate-200 transition-colors" href="/">
          EmployeeManagementSystem
        </a>
      </nav>
    </header>
  )
}

export default Header
