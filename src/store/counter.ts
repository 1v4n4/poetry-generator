import { create } from "zustand";
import { supabase } from "../lib/supa";

interface CountState {
  count: number | null;
  fetchCount: () => Promise<void>;
  increment: () => void;
  setCount: (val: number) => void;
}

export const useCount = create<CountState>((set) => ({
  count: null,

  fetchCount: async () => {
    const { count, error } = await supabase
      .from("poems")
      .select("*", { count: "exact", head: true });

    if (!error) {
      set({ count: count || 0 });
    }
  },

  increment: () => {
    set((state) => ({
      count: state.count !== null ? state.count + 1 : 1,
    }));
  },

  setCount: (val) => set({ count: val }),
}));
