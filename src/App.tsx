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
import ShareBlock from "./components/ShareBlock";
import { convertToCyrillic } from "./helper";

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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { savePoem } = useSavePoem();
  const [editablePoem, setEditablePoem] = useState(poem);

  useEffect(() => {
    setEditablePoem(poem);
  }, [poem]);

  const handleSendEmail = () => {
    if (!email) return alert("Unesite email adresu");
    if (!editablePoem) return alert("Morate generisati poeziju.");
    const inCyrillic = convertToCyrillic(editablePoem);
    const subject = encodeURIComponent("Bećirova poezija za tebe");
    const body = encodeURIComponent(
      `Ljubavi\n\nNeka ti poezija uljepša dan:\n\n${inCyrillic}\n\nIz dubine duše,\n${name}\n\n\n Posjeti stihoklepac.me i sastavi svoje stihove!`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

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

      const rawText = data.choices?.[0]?.message?.content || "Нема резултата";
      const cleanedText = rawText.replace(/\\n/g, "\n").replace(/\\s/g, "\n");
      const text = convertToCyrillic(cleanedText);
      setPoem(text);

      await savePoem(selectedTopics, text);
    } catch (e) {
      setError(`Грешка у генерисању поезије: ${e}`);
      setPoem("");
    } finally {
      setLoading(false);
    }
  };

  // Uncomment to enable Enter key to generate poem
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Enter" && !loading && selectedTopics.length > 0) {
  //       generatePoem();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [loading, selectedTopics]);

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 1,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 720,
          p: 3,
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
              label="Izaberi inspiraciju"
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
          <Box sx={{ mt: 3 }}>
            <TextField
              name="email"
              label="Unesi email adresu primaoca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              type="email"
            />

            <TextField
              name="name"
              label="Tvoje ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              name="poem"
              label="Izmijeni poeziju prije slanja"
              value={editablePoem}
              onChange={(e) => setEditablePoem(e.target.value)}
              multiline
              rows={6}
              fullWidth
              margin="normal"
              variant="outlined"
              helperText="Biće automatski konvertovano u ćirilicu"
            />

            <Button
              variant="contained"
              onClick={handleSendEmail}
              disabled={!email || !editablePoem.trim()}
            >
              Pošalji poeziju voljenoj osobi
            </Button>
          </Box>
        )}

        <ShareBlock
          title="Direktno iz veš mašine"
          text={poem || "Generiši svoje Bećir-stihove:"}
          url={window.location.href}
        />
      </Box>
    </Box>
  );
};

export default PoetryGenerator;
