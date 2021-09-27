import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";

import App from "./App";
import { render } from "react-dom";

render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById("app")
);
