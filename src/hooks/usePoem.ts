import { useEffect, useState } from "react";
import { supabase } from "../lib/supa";

const usePoem = (id?: number) => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [poem, setPoem] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[] | null>(null);

const savePoem = async (topics: string[], poemText: string) => {
  setSaving(true);
  setError(null);

  const { data, error } = await supabase
    .from("poems")
    .insert([
      {
        topics,
        poem: poemText,
        created_at: new Date().toISOString(),
      },
    ])
    .select("serial_id")

  setSaving(false);

  if (error || !data || data.length === 0) {
    setError(error?.message || "No data returned");
    return false;
  }

  return data[0].serial_id;
};

  useEffect(() => {
    if (!id) return;

    const fetchPoem = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("poems")
        .select("poem, topics")
        .eq("serial_id", id)
        .single();

      if (error) {
        setError("Pjesma nije nađena.");
        setPoem(null);
        setTopics(null);
      } else {
        setPoem(data.poem);
        setTopics(data.topics ?? null);
      }

      setLoading(false);
    };

    fetchPoem();
  }, [id]);

  return {
    poem,
    topics,
    savePoem,
    saving,
    loading,
    error,
  };
};

export default usePoem;
