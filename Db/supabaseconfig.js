import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://azatcxigvwursuyxxpys.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YXRjeGlndnd1cnN1eXh4cHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyMjUxMjUsImV4cCI6MjA2MzgwMTEyNX0.h_5iIHzKYtuNtT2fblDH1XCPSEwcfCwnkCKs5BKfxXE';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
