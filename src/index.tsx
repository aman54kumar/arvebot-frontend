import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";

// if (module.hot) module.hot.accept();
render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById("app")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
