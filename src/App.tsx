import { useState, useEffect } from "react";
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
    const workerUrl = import.meta.env.VITE_WORKERER_URL;

    try {
      const res = await fetch(workerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();

      const text = data.choices?.[0]?.message?.content || "Нема резултата";

      setPoem(text.replace(/\\n/g, "\n").replace(/\\s/g, "\n"));

      await savePoem(selectedTopics, text);
    } catch (e) {
      setError(`Грешка у генерисању поезије: ${e}`);
      setPoem("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !loading && selectedTopics.length > 0) {
        generatePoem();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, selectedTopics]);

  return (
    <Box
      sx={{
        height: "90vh", // fixed height, not minHeight
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 1, // reduce padding from 2 to 1
        overflow: "auto", // allow scroll only if needed
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 720,
          p: 3, // reduced padding from 4 to 3
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Bećirator™
        </Typography>

        <Typography variant="subtitle1" align="center" gutterBottom>
          Odaberi do pet tema i prizovi stihoklepca!
        </Typography>

        <Autocomplete
          multiple
          options={TOPICS}
          value={selectedTopics}
          onChange={(_, newValue) => {
            if (newValue.length <= MAX_SELECTION) setSelectedTopics(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Izaberite inspiraciju"
              placeholder="Teme"
            />
          )}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading || selectedTopics.length === 0}
          onClick={generatePoem}
        >
          Uključi centrifugu
        </Button>

        {loading && (
          <Typography align="center" sx={{ mt: 2 }}>
            Stihovi se sami pišu...
          </Typography>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {poem && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              bgcolor: "#1e1e1e", // dark paper look
              borderLeft: "4px solid #90caf9",
              whiteSpace: "pre-line",
              fontFamily: "monospace",
              fontSize: "1rem",
              lineHeight: 1.6,
            }}
          >
            {poem}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PoetryGenerator;
