import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import dark from "./theme";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={dark}>
      <CssBaseline /> {/* resets base styles to match dark theme */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
