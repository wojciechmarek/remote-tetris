import "./app.css";
import App from "./App.svelte";
import { inject } from "@vercel/analytics";

if (import.meta.env.VERCEL_ENV === "production") {
  inject();
}

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
