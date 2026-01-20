import React from 'react'
import UserProfile from '../components/UserProfile'

export default function SettingsPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <UserProfile />
    </div>
  )
}
