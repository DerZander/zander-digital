import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from "./App.jsx";
import {HashRouter} from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <HashRouter>
        <App/>
    </HashRouter>
);