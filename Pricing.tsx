import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store';

const features = [
  'Create player profile',
  'List unlimited share offerings',
  'Access to investor network',
  'Real-time earnings tracking',
  'Secure payment processing',
  '24/7 support',
  'Performance analytics',
  'Withdraw anytime',
];

export function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCardFlipped(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Montserrat'] mb-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            Start Your <span className="gradient-text">Staking Journey</span>
          </h2>
          <p
            className={`text-[#b3b3b3] max-w-xl mx-auto transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '200ms',
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            Affordable membership for players who want to sell shares
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <div
            className={`relative transition-all duration-700 ${
              cardFlipped
                ? 'opacity-100'
                : 'opacity-0'
            }`}
            style={{
              transform: cardFlipped ? 'rotateY(0deg)' : 'rotateY(-90deg)',
              transformStyle: 'preserve-3d',
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            {/* Card */}
            <div className="card-dark p-8 relative overflow-hidden">
              {/* Animated Border Glow */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, #00ff88, #00cc6a, #00ff88)',
                  backgroundSize: '200% 100%',
                  animation: 'borderGlow 4s linear infinite',
                  padding: '1px',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                }}
              />

              {/* Popular Badge */}
              <div className="absolute -top-px left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black text-xs font-bold px-4 py-1 rounded-b-lg">
                  <Sparkles className="w-3 h-3" />
                  MOST POPULAR
                </div>
              </div>

              {/* Plan Name */}
              <div className="text-center mt-4 mb-8">
                <h3 className="text-xl font-bold text-white font-['Montserrat'] mb-2">
                  Player Membership
                </h3>
                <p className="text-[#b3b3b3] text-sm">
                  List your gameplay and sell shares to investors
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[#b3b3b3] text-lg">$</span>
                  <span
                    className="text-5xl font-bold text-white font-['Montserrat'] shimmer"
                    style={{
                      background: 'linear-gradient(110deg, #fff 40%, #00ff88 50%, #fff 60%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'shimmer 3s linear infinite',
                    }}
                  >
                    9.99
                  </span>
                  <span className="text-[#b3b3b3]">/month</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li
                    key={feature}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{
                      transitionDelay: `${500 + index * 80}ms`,
                      transitionTimingFunction: 'var(--ease-expo-out)',
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#00ff88]" />
                    </div>
                    <span className="text-[#b3b3b3] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={handleGetStarted}
                className={`w-full btn-primary py-4 group transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90'
                }`}
                style={{
                  transitionDelay: '800ms',
                  transitionTimingFunction: 'var(--ease-elastic)',
                }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              {/* Secondary Link */}
              <p className="text-center mt-4 text-[#b3b3b3] text-sm">
                Learn more about{' '}
                <button
                  onClick={() => navigate('/players')}
                  className="text-[#00ff88] hover:underline"
                >
                  investor accounts
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes borderGlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </section>
  );
}
