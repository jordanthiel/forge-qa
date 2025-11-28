import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
//Import Mixpanel SDK
import mixpanel from "mixpanel-browser"

// Near entry of your product, init Mixpanel
mixpanel.init("8f8eb5440d6b78d9a1afea22650763b0", {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
    autocapture: true,
    record_sessions_percent: 100,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
