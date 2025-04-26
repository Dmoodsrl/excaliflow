import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to check if the user exists
export async function checkUser(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGSQL_ERROR_NO_DATA_FOUND') {
    console.error('Error checking user:', error)
    return null
  }

  return data
}

// Function to create a new user
export async function createUser(email, username) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, username }])
    .select()

  if (error) {
    console.error('Error creating user:', error)
    return null
  }

  return data[0]
}

// Function to sign in with email and password
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error('Error signing in:', error)
    return { error }
  }

  // Check if user exists in users table
  const user = await checkUser(email)
  if (!user) {
    // Create user record if it doesn't exist
    // Use email as username if not provided
    const username = email.split('@')[0]
    await createUser(email, username)
  }

  return { data }
}

// Function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
    return false
  }
  
  return true
}

// Function to get current session
export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error)
    return null
  }
  
  return data.session
}