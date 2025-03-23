import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import {HashRouter, Route, Routes} from "react-router";
import {routes} from "./routes.jsx";
import Navigation from "./components/navigation.jsx";
import {Box, Typography} from "@mui/material";

export default function App() {
    return (
        <HashRouter>
            <Box display="flex" flexDirection="column" minHeight="100vh">
                <Navigation/>
                <Box flexGrow={1}>
                    <Routes>
                        {routes.map((route) => (
                            <Route key={route.route} path={route.route} element={route.component}/>
                        ))}
                    </Routes>
                </Box>
                <Box component="footer" sx={{width: "100%", textAlign: "center", py: 2, mt: 4}}>
                    <Typography variant="caption" color="grey.800">
                        © 2025 Timo Zander. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </HashRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);