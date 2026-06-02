import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Verify if Supabase URL is a valid HTTPS endpoint rather than the placeholder
const isConfigured = supabaseUrl && supabaseUrl.startsWith('https://')

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : {
      from: (table) => ({
        insert: async (row) => {
          console.warn(`[Hovio Mock Supabase] Insert into "${table}":`, row)
          // Simulate network latency
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Simple email validation
          if (!row.email || !row.email.includes('@')) {
            return { data: null, error: { message: 'Invalid email address' } }
          }

          // Mock conflict/already exists error
          if (row.email === 'error@hovio.com') {
            return { data: null, error: { message: 'already exists', code: '23505' } }
          }

          return { data: [row], error: null }
        },
        select: (columns, options) => {
          return {
            // Support chainable methods if needed, or straight promise execution
            then: async (onfulfilled) => {
              console.warn(`[Hovio Mock Supabase] Fetch count from "${table}"`)
              // Simulate network latency
              await new Promise((resolve) => setTimeout(resolve, 300))
              return onfulfilled({
                data: [],
                error: null,
                count: 142, // High fidelity sandbox value
              })
            },
          }
        },
      }),
    }
