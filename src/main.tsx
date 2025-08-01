import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import dark from "./theme";
import App from "./App";
import Footer from "./components/Footer";
import Header from "./components/Header1";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={dark}>
      <CssBaseline /> {/* resets base styles to match dark theme */}
      <Header />
      <App />
      <Footer />
    </ThemeProvider>
  </StrictMode>
);
