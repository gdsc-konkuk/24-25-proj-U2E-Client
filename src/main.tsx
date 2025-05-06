import { createRoot } from "react-dom/client";
import App from "./App.tsx";

if (import.meta.env.VITE_API_URL === "https://test") {
  import("./mocks/browser")
    .then(({ worker }) => worker.start())
    .then(() => {
      renderApp();
    });
} else {
  renderApp();
}

function renderApp() {
  createRoot(document.getElementById("root") as HTMLElement).render(<App />);
}
