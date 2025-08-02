import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import usePoem from "hooks/usePoem";

const Poem = () => {
  const { id } = useParams<{ id: string }>();
  const poemId = id ? +id : undefined;
  const { poem, loading, error } = usePoem(poemId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSendEmail = () => {
    if (!email) return alert("Unesite email adresu");
    if (!poem) return alert("Morate generisati poeziju.");

    const subject = encodeURIComponent("Bećirova poezija za tebe");
    const body = encodeURIComponent(
      `Ljubavi\n\nNeka ti poezija uljepša dan:\n\n${poem}\n\nIz dubine duše,\n${name}\n\n\n---\nPosjeti stihoklepac.me, Bećirator će i tebi generisati stihove!`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setDialogOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", p: 3 }}>
      {loading && <CircularProgress />}
      {!loading && error && <Typography color="error">{error}</Typography>}

      {!loading && poem && (
        <>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 2 }}>
            {poem}
          </Typography>

          <Box sx={{ textAlign: "right" }}>
            <IconButton
              onClick={() => setDialogOpen(true)}
              title="Pošalji emailom"
            >
              <SendIcon />
            </IconButton>
          </Box>

          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Pošalji pjesmu</DialogTitle>
            <DialogContent>
              <TextField
                label="Email primaoca"
                fullWidth
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Tvoje ime"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Otkaži</Button>
              <Button
                variant="contained"
                onClick={handleSendEmail}
                disabled={!email || !poem.trim()}
              >
                Pošalji
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default Poem;
