import Nav from './Nav';
import Hero from './Hero';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import HowItWorks from './HowItWorks';
import WhyNow from './WhyNow';
import ForEngineers from './ForEngineers';
import ForInvestors from './ForInvestors';
import Roadmap from './Roadmap';
import TeamCTA from './TeamCTA';
import EmailCapture from './EmailCapture';
import FeedbackBadge from './FeedbackBadge';

const LandingPage = () => {
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
};

export default LandingPage;

