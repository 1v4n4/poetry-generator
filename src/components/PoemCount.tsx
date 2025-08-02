import { useState } from "react";
import {
  Typography,
  IconButton,
  Popover,
  useMediaQuery,
  Box,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const PoemCount = ({ count }: { count: number }) => {
  const isSmall = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      {isSmall ? (
        <>
          <Typography variant="h6">📜 {count}</Typography>
          <IconButton
            size="small"
            onClick={handleClick}
            aria-label="Info"
            sx={{ mb: 1.5 }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Box sx={{ p: 2, maxWidth: 250 }}>
              Do sada je sastavljeno {count} pjesama.
            </Box>
          </Popover>
        </>
      ) : (
        <Typography variant="h6">
          📜 Do sada je sastavljeno {count} pjesama
        </Typography>
      )}
    </Box>
  );
};

export default PoemCount;
