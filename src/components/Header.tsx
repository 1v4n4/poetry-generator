import { AppBar, Toolbar, Typography, Tooltip } from "@mui/material";
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
          <Tooltip title="Čitaj pjesme dodajući brojeve na kraj adrese, npr: stihoklepac.me/31">
            <Typography variant="body1" color="textPrimary">
              📜 Do sada sastavljeno {count} pjesama
            </Typography>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
