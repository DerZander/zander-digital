import React from "react";
import ReactDOM from "react-dom/client";
import {useEffect, useMemo, useState} from "react";
import "./index.css";
import "./App.css";
import {HashRouter, Route, Routes} from "react-router";
import {Box, CssBaseline, ThemeProvider, Typography, createTheme} from "@mui/material";
import {routes} from "./routes.jsx";
import Navigation from "./components/navigation.jsx";
import LandingPage from "./pages/LandingPage.jsx";

export default function App() {
    const [mode, setMode] = useState(() => {
        const initialMode = window.localStorage.getItem("zander-digital-theme") === "light" ? "light" : "dark";
        document.documentElement.dataset.theme = initialMode;
        return initialMode;
    });

    useEffect(() => {
        document.documentElement.dataset.theme = mode;
        window.localStorage.setItem("zander-digital-theme", mode);
    }, [mode]);

    const theme = useMemo(() => {
        const isLight = mode === "light";
        return createTheme({
            palette: {
                mode,
                primary: {
                    main: isLight ? "#1769d2" : "#54d6e8",
                    contrastText: isLight ? "#ffffff" : "#081a24",
                },
                secondary: {main: isLight ? "#62748b" : "#9dafc4"},
                background: {
                    default: isLight ? "#f5f8fc" : "#0e1724",
                    paper: isLight ? "#ffffff" : "#162235",
                },
                text: {
                    primary: isLight ? "#15263c" : "#eaf2ff",
                    secondary: isLight ? "#62748b" : "#9dafc4",
                },
            },
            typography: {
                fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                button: {fontWeight: 650, textTransform: "none"},
            },
        });
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <HashRouter>
                <Box display="flex" flexDirection="column" minHeight="100vh">
                    <Navigation
                        isLight={mode === "light"}
                        onToggleTheme={() => setMode((currentMode) => currentMode === "light" ? "dark" : "light")}
                    />
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
