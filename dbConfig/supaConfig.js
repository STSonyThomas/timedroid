import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_BASE;
const supaKey = process.env.SUPABASE_KEY;

export const supabase =  createClient(supabaseUrl,supaKey);