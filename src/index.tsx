// import { StrictMode } from "react";
import { HashRouter as Router } from 'react-router-dom';
import './index.scss';
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import App from './App';
import { render } from 'react-dom';

/***
** Uncomment for sentry logging
Sentry.init({
  dsn: "https://4ee9eb855a3d475eba0981e5e96f4090@o1245495.ingest.sentry.io/6402725",
  integrations: [new BrowserTracing()],

  tracesSampleRate: 1.0,
});
*/
render(
    // <StrictMode>
    <Router>
        <App />
    </Router>,
    // </StrictMode>,
    document.getElementById('app'),
);
