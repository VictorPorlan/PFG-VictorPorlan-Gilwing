import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/landingPage";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CreateCampaign from "./pages/createCampaign";
import DetailsCampaign from "./pages/detailsCampaign";
import MisProyectos from "./pages/misProyectos";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      main: "#ba87fa"
    }
  },
});


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/crear" element={<CreateCampaign />} />
        <Route path="/campaigns" element={<MisProyectos />} />
        <Route path="/campaigns/:address" element={<DetailsCampaign />} />
        <Route path='*' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
