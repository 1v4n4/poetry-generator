import { AppBar, Toolbar, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import { useCount } from "stores/counter";
import { useEffect } from "react";
import PoemCount from "./PoemCount";
import HeaderInfo from "./HeaderInfo";

const Header = () => {
  const { count, fetchCount } = useCount();
  const navigate = useNavigate();

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
        {count !== null && <PoemCount count={count} />}

        {/* Right: Info Icon with Tooltip */}
        <HeaderInfo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
