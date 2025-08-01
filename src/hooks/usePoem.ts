import { useState } from "react";
import { supabase } from "../lib/supa";

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
