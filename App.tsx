import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { FeaturedPlayers } from '@/sections/FeaturedPlayers';
import { HowItWorks } from '@/sections/HowItWorks';
import { StatsCounter } from '@/sections/StatsCounter';
import { Pricing } from '@/sections/Pricing';
import { Players } from '@/pages/Players';
import { PlayerProfile } from '@/pages/PlayerProfile';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Dashboard } from '@/pages/Dashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';

function Home() {
  return (
    <>
      <Hero />
      <FeaturedPlayers />
      <HowItWorks />
      <StatsCounter />
      <Pricing />
    </>
  );
}

function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-['Montserrat'] text-center mb-8">
          How <span className="gradient-text">FishStake</span> Works
        </h1>
        <p className="text-[#b3b3b3] text-center text-lg mb-12">
          Start investing in fish table players in 4 simple steps
        </p>
        
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="card-dark p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-[#00ff88]">01</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-['Montserrat'] mb-3">
                Browse Players
              </h3>
              <p className="text-[#b3b3b3] leading-relaxed">
                Explore verified player profiles, check their stats, ROI, and track record. 
                Find the perfect match for your investment strategy. Each player profile includes 
                detailed performance metrics, game history, and investor reviews.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card-dark p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-[#00ff88]">02</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-['Montserrat'] mb-3">
                Buy Shares
              </h3>
              <p className="text-[#b3b3b3] leading-relaxed">
                Purchase shares in players you believe in. Starting from just $10 per share. 
                Diversify your portfolio across multiple players to minimize risk and maximize 
                potential returns. All transactions are secure and instant.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card-dark p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-[#00ff88]">03</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-['Montserrat'] mb-3">
                They Play
              </h3>
              <p className="text-[#b3b3b3] leading-relaxed">
                Players compete in fish table tournaments. Track their progress in real-time 
                through our live dashboard. Get notified of big wins, tournament placements, 
                and other important updates about your investments.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card-dark p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-[#00ff88]">04</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-['Montserrat'] mb-3">
                Share Profits
              </h3>
              <p className="text-[#b3b3b3] leading-relaxed">
                Receive your share of winnings automatically when they cash out. Withdraw 
                anytime to your bank account or reinvest in new opportunities. Our platform 
                ensures transparent and timely profit distribution.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white font-['Montserrat'] text-center mb-8">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What is FishStake?',
                a: 'FishStake is a platform that allows you to invest in fish table players by buying shares of their gameplay. When they win, you share in the profits.',
              },
              {
                q: 'How much can I earn?',
                a: 'Returns vary based on player performance. Our top players have delivered an average ROI of 89% to investors.',
              },
              {
                q: 'Is my investment safe?',
                a: 'All players are verified and have proven track records. However, as with any investment, there are risks involved. Only invest what you can afford to lose.',
              },
              {
                q: 'How do I become a player?',
                a: 'Sign up for a Player Membership at $9.99/month to create your profile and start selling shares to investors.',
              },
            ].map((faq, index) => (
              <div key={index} className="card-dark p-6">
                <h4 className="text-lg font-bold text-white font-['Montserrat'] mb-2">
                  {faq.q}
                </h4>
                <p className="text-[#b3b3b3]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Pricing />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerProfile />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
