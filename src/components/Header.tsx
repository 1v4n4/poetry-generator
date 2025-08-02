import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import { useCount } from "stores/counter";
import { useEffect } from "react";

const Header = () => {
  const { count, fetchCount } = useCount();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {/* Left: Home Icon */}
        <IconButton
          onClick={() => navigate("/")}
          edge="start"
          size="large"
          title="Doma"
        >
          <HomeOutlinedIcon />
        </IconButton>

        {/* Center: Poem Count */}
        {count !== null &&
          (isSmall ? (
            <Tooltip title={`📜 Do sada je sastavljeno ${count} pjesama`}>
              <Typography
                variant="h6"
                color="textPrimary"
                sx={{ textAlign: "center", flexGrow: 1, cursor: "default" }}
              >
                📜 {count}
              </Typography>
            </Tooltip>
          ) : (
            <Typography
              variant="h6"
              color="textPrimary"
              sx={{ textAlign: "center", flexGrow: 1 }}
            >
              📜 Do sada je sastavljeno {count} pjesama
            </Typography>
          ))}

        {/* Right: Info Icon with Tooltip */}
        <Tooltip
          title={
            <span>
              Čitaj pjesme dodajući cifre na kraj adrese. Broj mora biti manji
              od ukupnog broja pjesama, npr:{" "}
              <Link
                href="https://stihoklepac.me/31"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                stihoklepac.me/31
              </Link>
            </span>
          }
        >
          <IconButton size="large">
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
