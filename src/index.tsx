import * as React from "react";
import { ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <>
    <ColorModeScript />
    <App />
  </>
);

serviceWorker.unregister();

reportWebVitals();
