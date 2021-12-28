// import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
// import LogRocket from 'logrocket';
// LogRocket.init('yx1kmd/arvebot_log');
// LogRocket.identify('123456', {
//   name: 'aman',
// });
import App from "./App";
import { render } from "react-dom";

render(
  // <StrictMode>
  <Router>
    <App />
  </Router>,
  // </StrictMode>,
  document.getElementById("app")
);
