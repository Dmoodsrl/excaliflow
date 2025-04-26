import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getCurrentSession } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const session = await getCurrentSession()
      
      if (session) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
    
    checkSession()
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Redirecting...</p>
    </div>
  )
}