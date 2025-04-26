import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { LoginForm } from '@/components/login-form'
import { getCurrentSession } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const session = await getCurrentSession()
      
      if (session) {
        router.push('/dashboard')
      }
    }
    
    checkSession()
  }, [router])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2"
            >
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-8">
            <div className="mt-6">
              <div className="mt-10 bg-white p-8 shadow-lg rounded-xl">
                <LoginForm />
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Hint: Use username "admin" and password "admin" to log in</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="relative hidden w-0 flex-1 lg:block">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-700"
        >
          <div className="flex h-full items-center justify-center p-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl text-center text-white"
            >
              <h2 className="text-4xl font-bold">Secure Login Portal</h2>
              <p className="mt-4 text-xl">Access your dashboard with our beautiful and secure authentication system</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}