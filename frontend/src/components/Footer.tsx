import React from 'react'

function Footer() {
  return (
    <footer className="bg-white border-t py-3 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} TestApp. All rights reserved.
    </footer>
  )
}

export default Footer
