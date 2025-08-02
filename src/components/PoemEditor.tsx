import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface PoemEditorProps {
  poem: string;
  onChange: (value: string) => void;
}

const PoemEditor = ({ poem, onChange }: PoemEditorProps) => {
  const [rows, setRows] = useState(6);

  useEffect(() => {
    const lineCount = poem.split("\n").length;
    setRows(Math.max(6, lineCount));
  }, [poem]);

  return (
    <TextField
      name="poem"
      label="Uredi svoju pjesmu"
      value={poem}
      onChange={(e) => onChange(e.target.value)}
      multiline
      minRows={rows}
      fullWidth
      margin="normal"
      variant="outlined"
      helperText="Biće automatski konvertovano u ćirilicu"
    />
  );
};

export default PoemEditor;
