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
import { Snackbar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import usePoem from "hooks/usePoem";
import ShareBlock from "components/ShareBlock";
import CampaignIcon from "@mui/icons-material/Campaign";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Poem = () => {
  const { id } = useParams<{ id: string }>();
  const poemId = id ? +id : undefined;
  const { poem, loading, error } = usePoem(poemId);
  const [copied, setCopied] = useState(false);

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!poem) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        maxWidth: 720,
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
        <Snackbar
          open={copied}
          autoHideDuration={2000}
          onClose={() => setCopied(false)}
          message="Link pjesme kopiran! Ne zaboravi da ga sačuvaš."
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />

        {loading && <CircularProgress />}
        {!loading && error && <Typography color="error">{error}</Typography>}

        {!loading && poem && (
          <>
            <Typography variant="h5" sx={{ whiteSpace: "pre-line", mb: 2 }}>
              {poem}
            </Typography>

            <Box sx={{ textAlign: "right" }}>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://stihoklepac.me/${poemId}`
                  );
                  setCopied(true);
                }}
                title="Kopiraj link"
              >
                <ContentCopyIcon />
              </IconButton>

              <IconButton
                onClick={() => setDialogOpen(true)}
                title="Pošalji emailom"
              >
                <SendIcon />
              </IconButton>

              <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>Pošalji pjesmu elektronskom poštom</DialogTitle>
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
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <CampaignIcon sx={{ color: "text.primary" }} />
          Podijeli svoju poeziju sa svijetom
        </Typography>
        <ShareBlock
          title="Direktno iz veš mašine"
          text={poem || "Generiši svoje Bećir-stihove:"}
          url={window.location.href}
        />
      </Box>
    </Box>
  );
};

export default Poem;
