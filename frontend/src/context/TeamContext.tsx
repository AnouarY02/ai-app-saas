import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Team, getTeams } from '../utils/apiClient'
import { useAuth } from './AuthContext'

interface TeamContextType {
  teams: Team[]
  loading: boolean
  error: string | null
  refreshTeams: () => Promise<void>
}

const TeamContext = createContext<TeamContextType>({
  teams: [],
  loading: true,
  error: null,
  refreshTeams: async () => {},
})

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTeams = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getTeams()
      setTeams(data)
    } catch (e: any) {
      setError(e.message || 'Failed to load teams')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchTeams()
  }, [user])

  return (
    <TeamContext.Provider value={{ teams, loading, error, refreshTeams: fetchTeams }}>
      {children}
    </TeamContext.Provider>
  )
}

export const useTeams = () => useContext(TeamContext)
