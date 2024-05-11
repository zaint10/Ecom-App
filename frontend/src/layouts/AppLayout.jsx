import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@src/theme";

import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
const AppLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        <Header />
        <main style={{ flexGrow: 1, padding: "20px" }}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
