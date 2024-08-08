import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://iqxjdbiwzpwzfvomtsvt.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeGpkYml3enB3emZ2b210c3Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NjgyNjcsImV4cCI6MjAzODQ0NDI2N30.Et8tXA4J2BqpkBvArFf1r5Da1CKwGxinO4bUg0xKzwI"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;