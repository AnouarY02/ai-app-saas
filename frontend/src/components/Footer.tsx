import React from 'react'

const Footer: React.FC = () => (
  <footer className="w-full py-4 bg-white border-t text-center text-gray-500 text-sm">
    &copy; {new Date().getFullYear()} AI App. All rights reserved.
  </footer>
)

export default Footer
