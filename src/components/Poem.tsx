import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress } from "@mui/material";
import usePoem from "hooks/usePoem";

const Poem = () => {
  const { id } = useParams<{ id: string }>();

  const { poem, loading, error } = usePoem(+id);
  if (!id) return <Typography variant="h6">404</Typography>;
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
