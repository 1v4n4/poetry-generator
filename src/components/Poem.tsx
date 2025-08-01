import { useParams } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import usePoem from "hooks/usePoem";

const Poem = () => {
  const { id } = useParams<{ id: string }>();

  const poemId = id ? +id : undefined;
  const { poem, loading, error } = usePoem(poemId);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && error && <Typography color="error">{error}</Typography>}
      {!loading && poem && (
        <Typography variant="body1" whiteSpace="pre-line">
          {poem}
        </Typography>
      )}
    </>
  );
};

export default Poem;
