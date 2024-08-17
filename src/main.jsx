import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";
import { PrivyProvider } from "@privy-io/react-auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <PrivyProvider
        appId="clzvl4xwt001h17gs4bujxysy"
        config={{
            // Customize Privy's appearance in your app
            appearance: {
                theme: 'dark',
            },
        }}
    >
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
            <App />
        </Router>
    </PrivyProvider>
)