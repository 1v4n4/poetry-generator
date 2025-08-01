import { AppBar, Link, Toolbar, Typography, Tooltip } from "@mui/material";
import { useCount } from "stores/counter";
import { useEffect } from "react";

const Header = () => {
  const { count, fetchCount } = useCount();

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "center" }}>
        {count !== null && (
          <Tooltip
            title={
              <span>
                Čitaj pjesme dodajući brojeve na kraj web adrese. Broj mora biti
                manji od ukupnog broja pjesama, npr:{" "}
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
            <Typography variant="body1" color="textPrimary">
              📜 Do sada je sastavljeno {count} pjesama
            </Typography>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
