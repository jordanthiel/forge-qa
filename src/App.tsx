import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PitchDeck from './components/PitchDeck';
import ForgeDemoPage from './forge-demo/ForgeDemoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pitch" element={<PitchDeck />} />
      <Route path="/forge-demo" element={<ForgeDemoPage />} />
    </Routes>
  );
}

export default App;
