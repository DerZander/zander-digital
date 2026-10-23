import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import {HashRouter, Route, Routes} from "react-router";
import {Box, CssBaseline, ThemeProvider, Typography, createTheme} from "@mui/material";
import {routes} from "./routes.jsx";
import Navigation from "./components/navigation.jsx";
import LandingPage from "./pages/LandingPage.jsx";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {main: "#b6ef72", contrastText: "#152016"},
        secondary: {main: "#9aaba6"},
        background: {default: "#101817", paper: "#172321"},
        text: {primary: "#edf4f2", secondary: "#9aaba6"},
    },
    typography: {
        fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        button: {fontWeight: 650, textTransform: "none"},
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <HashRouter>
                <Box display="flex" flexDirection="column" minHeight="100vh">
                    <Navigation/>
                    <Box flexGrow={1}>
                        <Routes>
                            {routes.map((route) => (
                                <Route key={route.route} path={route.route} element={route.component}/>
                            ))}
                            <Route path="*" element={<Typography variant="h1">404 - Seite nicht gefunden</Typography>}/>
                            <Route path="/" element={<LandingPage/>}/>
                        </Routes>
                    </Box>
                    <Box component="footer" className="page-footer" sx={{width: "100%", textAlign: "center", py: 2}}>
                        <Typography variant="caption">
                            © {new Date().getFullYear()} Timo Zander · Zander.digital
                        </Typography>
                    </Box>
                </Box>
            </HashRouter>
        </ThemeProvider>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
