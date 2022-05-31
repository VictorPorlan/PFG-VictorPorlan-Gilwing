import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/landingPage";
import web3 from "./utils/web3";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CreateCampaign from "./pages/createCampaign";
import DetailsCampaign from "./pages/detailsCampaign";
import MisProyectos from "./pages/misProyectos";
import ErrorDialog from "./components/molecules/errorDialog";
import MisDonaciones from "./pages/misDonaciones";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ba87fa",
        },
        secondary: {
            main: "#1E1E1E",
        },
    },
});
const App = () => {
    const [error, setError] = useState(false)
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    useEffect(() => {
        async function checkLogged() {
            try{
                const accounts = await web3.eth.getAccounts();
                if (accounts.length === 0) {
                    setTitle("No se ha iniciado sesión")
                    setMessage(`Por favor, inicie sesión en la wallet que tenga instalada actualmente en su navegador.`)
                    setError(true)
                }
            }
            catch(e){
                setTitle("No se ha detectado una wallet en el navegador")
                setMessage(`Lo sentimos, para utilizar esta aplicación 
                es necesario el uso de una wallet para gestionar 
                las transacciones que sea necesario realizar. 
                En Gilwing recomendados encarecidamente el uso 
                de Metamask. <a href=https://metamask.io/ target="_blank" style="color: white; text-decoration: underline;"> Aquí encontrará cómo instalar y usar Metamask</a>`)
                setError(true)
            }
        }
        checkLogged();
    }, []);

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <BrowserRouter>
                    <ErrorDialog
                        error={error}
                        title={title}
                        message={message}
                        onPress={() => window.location.reload()}
                    />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/crear" element={<CreateCampaign />} />
                        <Route path="/campaigns" element={<MisProyectos />} />
                        <Route
                            path="/campaigns/:address"
                            element={<DetailsCampaign />}
                        />
                        <Route path="*" element={<LandingPage />} />
                        <Route path="/donations" element={<MisDonaciones />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
};
export default App;
