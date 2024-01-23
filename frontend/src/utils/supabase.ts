import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oukztwgobbpvjuhlvpft.supabase.co';
//const supabaseUrl = process.env.SUPABASE_URL!;

const supabaseANonPublic =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a3p0d2dvYmJwdmp1aGx2cGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxOTEwMDAsImV4cCI6MjAxNDc2NzAwMH0.mTS-khri5Zu5PDkwy9PUERNtP4q--jJF2Wq8mM45nkk';

export const supabase = createClient(supabaseUrl, supabaseANonPublic);
