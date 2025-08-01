import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import dark from "./theme";
import Header from "components/Header";
import Footer from "components/Footer";
import PoetryGenerator from "components/PoetryGenerator";
import SharedPoemPage from "components/Poem";
import Layout from "components/Layout";

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<PoetryGenerator />} />
          <Route path="/:id" element={<SharedPoemPage />} />
        </Routes>
      </Layout>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
