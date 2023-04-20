import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pszjubrdodkowmcjcemg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzemp1YnJkb2Rrb3dtY2pjZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5OTk0MzgsImV4cCI6MTk5NzU3NTQzOH0.lqp1LgwoexpYCwooGg77MNDcGYJ3il54d10OvPKJtIY';
export const supabase = createClient(supabaseUrl, supabaseKey);

