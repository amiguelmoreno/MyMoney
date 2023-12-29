import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ohyjyewcoqjjpeyjfsmo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oeWp5ZXdjb3FqanBleWpmc21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2MTA3MjksImV4cCI6MjAxOTE4NjcyOX0.B7COAhAgFpdfK50NhowkuZHQeSX-BFnGvkIRXnIq4U0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
