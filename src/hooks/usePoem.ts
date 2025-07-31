import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPA_URL;
const supabaseKey = import.meta.env.VITE_SUPA_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be defined in environment variables.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export const useSavePoem = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const savePoem = async (topics: string[], poem: string) => {
    setSaving(true);
    setError(null);

    const { error } = await supabase.from("poems").insert([
      {
        topics,
        poem,
        created_at: new Date().toISOString(),
      },
    ]);

    setSaving(false);

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  };

  return { savePoem, saving, error };
};
