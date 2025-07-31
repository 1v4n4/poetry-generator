import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useSavePoem } from "./hooks/usePoem";
import { generatePrompt } from "./helper";

const TOPICS = [
  "pravoslavlje",
  "veš mašina",
  "ostroške grede",
  "snošaj",
  "ljubav",
  "ikona",
  "Rusija",
  "književne večeri",
  "violina",
  "Tver",
  "breza",
  "prazan bazen",
];

const MAX_SELECTION = 5;

export const PoetryGenerator = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [poem, setPoem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { savePoem } = useSavePoem();

  const generatePoem = async () => {
    if (selectedTopics.length === 0) return;

    setLoading(true);
    setPoem("");
    setError(null);

    const prompt = generatePrompt(selectedTopics);

    try {
      const res = await fetch(
        "https://openai-proxy-production.becirifikacija.workers.dev",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
          }),
        }
      );

      const data = await res.json();

      const text = data.choices?.[0]?.message?.content || "Нема резултата";

      setPoem(text);

      // Save to Supabase:
      await savePoem(selectedTopics, text);
    } catch (e) {
      setError(`Грешка у генерисању поезије: ${e}`);
      setPoem("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
      <Autocomplete
        multiple
        options={TOPICS}
        value={selectedTopics}
        onChange={(event, newValue) => {
          if (newValue.length <= MAX_SELECTION) setSelectedTopics(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Izaberite inspiraciju (maksimalno 5)"
            placeholder="Teme"
          />
        )}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading || selectedTopics.length === 0}
        onClick={generatePoem}
      >
        Daj mi pjesmu
      </Button>

      {loading && <Typography sx={{ mt: 2 }}>Stihoklepac radi...</Typography>}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {poem && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          {poem}
        </Box>
      )}
    </Box>
  );
};

export default PoetryGenerator;
