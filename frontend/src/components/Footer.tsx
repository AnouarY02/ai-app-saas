import React from 'react'

const Footer: React.FC = () => (
  <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm mt-auto">
    &copy; {new Date().getFullYear()} Padel Club Manager. All rights reserved.
  </footer>
)

export default Footer
