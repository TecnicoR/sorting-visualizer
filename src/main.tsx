import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/themes/prism-tomorrow.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
