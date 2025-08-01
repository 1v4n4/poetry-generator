import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import dark from "./theme";
import Header from "components/Header";
import Footer from "components/Footer";
import PoetryGenerator from "components/PoetryGenerator";
import SharedPoemPage from "components/Poem"; // you'll make this

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<PoetryGenerator />} />
        <Route path="/:poemId" element={<SharedPoemPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
