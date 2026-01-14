import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://cpdwazwtvjpogpwizqis.supabase.co";

const API_KEY = "sb_publishable_BAKO2m_kEhfBQjpyPFVDgA_uhwlG-uB";

export const supabase = createClient(PROJECT_URL, API_KEY);
