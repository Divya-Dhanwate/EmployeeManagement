import React from 'react'

const FooterComponent = () => {
  // Get current year automatically so you never have to manually update it
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Responsive grid container: Stacks vertically on mobile, spreads horizontally on desktop */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          
          {/* Brand/Copyright section */}
          <div className="text-center md:text-left">
            <span className="font-semibold text-white tracking-wide">EMS Portal</span>
            <span className="mx-2">|</span>
            <span>&copy; {currentYear} All rights reserved.</span>
          </div>

          {/* Practical utility link list */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="/privacy" className="hover:text-purple-400 transition-colors duration-200">Privacy Policy</a>
            <a href="/terms" className="hover:text-purple-400 transition-colors duration-200">Terms of Service</a>
            <a href="/support" className="hover:text-purple-400 transition-colors duration-200">Support</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
