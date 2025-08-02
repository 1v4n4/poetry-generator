import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import { useCount } from "stores/counter";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { count, fetchCount } = useCount();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        <Tooltip title="Doma">
          <IconButton onClick={() => navigate("/")}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
        {count !== null && (
          <Tooltip
            title={
              <Box>
                <Typography variant="body2">
                  Čitaj pjesme dodajući brojeve na kraj web adrese.
                </Typography>
                <Typography variant="body2">
                  Broj ne smije biti veći od ukupnog broja pjesama, npr:{" "}
                  <Link
                    href="https://stihoklepac.me/31"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    stihoklepac.me/31
                  </Link>
                </Typography>
              </Box>
            }
          >
            <Typography
              variant="h6"
              color="textPrimary"
              sx={{ textAlign: "center" }}
            >
              📜 Do sada je sastavljeno {count} pjesama
            </Typography>
          </Tooltip>
        )}
        <Box width={40} /> {/* Spacer to balance layout with home icon */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
