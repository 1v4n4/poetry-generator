import { useState } from "react";
import {
  Tooltip,
  IconButton,
  Popover,
  Box,
  Link,
  useMediaQuery,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const HeaderInfo = () => {
  const isSmall = useMediaQuery("(max-width:600px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const content = (
    <>
      Čitaj pjesme dodajući cifre na kraj adrese. Broj mora biti manji od
      ukupnog broja pjesama, npr:{" "}
      <Link
        href="https://stihoklepac.me/31"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
      >
        stihoklepac.me/31
      </Link>
    </>
  );

  if (isSmall) {
    // Small screens: only popover on click
    return (
      <>
        <IconButton size="large" onClick={handleClick} aria-label="Info">
          <InfoOutlinedIcon />
        </IconButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Box sx={{ p: 2, maxWidth: 300 }}>{content}</Box>
        </Popover>
      </>
    );
  }

  // Large screens: Tooltip on hover
  return (
    <Tooltip title={content} arrow>
      <IconButton size="large" onClick={handleClick} aria-label="Info">
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default HeaderInfo;
