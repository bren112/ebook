import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gghsaudehzfaysisalmt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnaHNhdWRlaHpmYXlzaXNhbG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNzQwNTAsImV4cCI6MjAzOTk1MDA1MH0.AjfwoGE1spiZPYckfbMeB3X1CHNylN5jHP21twtW7iw'
export const supabase = createClient(supabaseUrl, supabaseKey);
