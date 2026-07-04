import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/barlow/300.css";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
