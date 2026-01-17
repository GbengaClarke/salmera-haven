import { createClient } from "@supabase/supabase-js";

// export const PROJECT_URL = "https://cpdwazwtvjpogpwizqis.supabase.co";

export const supabaseUrl = "https://cpdwazwtvjpogpwizqis.supabase.co";

const API_KEY = "sb_publishable_BAKO2m_kEhfBQjpyPFVDgA_uhwlG-uB";

export const supabase = createClient(supabaseUrl, API_KEY);
