import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PitchDeck from './components/PitchDeck';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pitch" element={<PitchDeck />} />
    </Routes>
  );
}

export default App;
