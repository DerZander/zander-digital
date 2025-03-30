import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
// import App from "./App.jsx";
import {HashRouter, Route, Routes} from "react-router";
import {routes} from "./routes.jsx";
import Navigation from "./components/navigation.jsx";

// const root = document.getElementById("root");


export default function App() {
    return (
        <HashRouter>
            <Navigation/>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.route} path={route.route} element={route.component}/>
                ))}
            </Routes>
        </HashRouter>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);