import Nav from './components/Nav';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import HowItWorks from './components/HowItWorks';
import WhyNow from './components/WhyNow';
import ForEngineers from './components/ForEngineers';
import ForInvestors from './components/ForInvestors';
import Roadmap from './components/Roadmap';
import TeamCTA from './components/TeamCTA';
import EmailCapture from './components/EmailCapture';
import FeedbackBadge from './components/FeedbackBadge';

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Nav />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <WhyNow />
      <ForEngineers />
      <ForInvestors />
      <Roadmap />
      <TeamCTA />
      <EmailCapture />
      <FeedbackBadge />
    </div>
  );
}

export default App;
