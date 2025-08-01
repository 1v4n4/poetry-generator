import { AppBar, Toolbar, Typography } from "@mui/material";
import { useCount } from "../store/counter";
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
          <Typography variant="body1" color="textPrimary">
            📜 Do sada sastavljeno {count} pjesama
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
