import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import usePoem from "hooks/usePoem";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { generatePrompt, convertToCyrillic } from "../helper";
import ShareBlock from "components/ShareBlock";
import { useCount } from "stores/counter";

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
  const [poemId, setPoemId] = useState<number | null>(null);

  const { savePoem } = usePoem();
  const { increment } = useCount();

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
      const id = await savePoem(selectedTopics, text);
      setPoemId(id);
      increment();
    } catch (e) {
      setError(`Грешка у генерисању поезије: ${e}`);
      setPoem("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        bgcolor: "background.paper",
        mx: "auto",
        px: 3,
        py: 6,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
          <Paper
            elevation={1}
            sx={{
              whiteSpace: "pre-wrap",
              mt: 3,
              p: 2,
              fontFamily: "monospace",
              fontSize: 16,
              borderRadius: 1,
              minHeight: 150,
            }}
          >
            {poem}
          </Paper>
        )}

        {poemId && (
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 360 }}
            >
              <InfoOutlinedIcon
                fontSize="small"
                sx={{ verticalAlign: "middle" }}
              />
              Klikom dobijaš svoj jedinstveni link koji možeš dijeliti i
              sačuvati za kasnije.{" "}
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.open(`/${poemId}`, "_blank")}
            >
              Prikaži moju pjesmu
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <ShareBlock
          title="Sihovi iz veš mašine"
          text={"Bećirator: I ti možeš biti pesnik!"}
          url={window.location.href}
        />
      </Box>
    </Box>
  );
};

export default PoetryGenerator;
