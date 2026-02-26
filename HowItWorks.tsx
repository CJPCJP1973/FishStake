import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Gamepad2, Coins, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step {
  icon: React.ElementType;
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Search,
    number: '01',
    title: 'Browse Players',
    description:
      'Explore verified player profiles, check their stats, ROI, and track record. Find the perfect match for your investment strategy.',
  },
  {
    icon: ShoppingCart,
    number: '02',
    title: 'Buy Shares',
    description:
      'Purchase shares in players you believe in. Starting from just $10 per share. Diversify your portfolio across multiple players.',
  },
  {
    icon: Gamepad2,
    number: '03',
    title: 'They Play',
    description:
      'Players compete in fish table tournaments. Track their progress in real-time through our live dashboard.',
  },
  {
    icon: Coins,
    number: '04',
    title: 'Share Profits',
    description:
      'Receive your share of winnings automatically when they cash out. Withdraw anytime or reinvest in new opportunities.',
  },
];

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false, false]);
  const [titleVisible, setTitleVisible] = useState(false);
  const [pathProgress, setPathProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => titleObserver.disconnect();
  }, []);

  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-step') || '0');
            setTimeout(() => {
              setVisibleSteps((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200);
            stepObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const stepElements = document.querySelectorAll('[data-step]');
    stepElements.forEach((el) => stepObserver.observe(el));

    return () => stepObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(
          1,
          Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height))
        );
        setPathProgress(progress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Montserrat'] mb-4 transition-all duration-700 ${
              titleVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            How Fish<span className="gradient-text">Stake</span> Works
          </h2>
          <p
            className={`text-[#b3b3b3] max-w-xl mx-auto transition-all duration-700 ${
              titleVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '200ms',
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            Start investing in fish table players in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Path - Desktop Only */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="relative h-full max-w-4xl mx-auto">
              {/* Background Path */}
              <div className="absolute inset-0 bg-[#333333] rounded-full" />
              {/* Animated Progress Path */}
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00ff88] to-[#00cc6a] rounded-full transition-all duration-300"
                style={{ width: `${pathProgress}%` }}
              />
              {/* Glow Effect */}
              <div
                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent blur-md transition-all duration-300"
                style={{ left: `calc(${pathProgress}% - 40px)` }}
              />
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                data-step={index}
                className={`relative transition-all duration-700 ${
                  visibleSteps[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionTimingFunction: 'var(--ease-expo-out)',
                }}
              >
                {/* Icon */}
                <div className="relative mb-6 flex justify-center">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-[#0d0d0d] border border-[#333333] flex items-center justify-center transition-all duration-500 ${
                      visibleSteps[index]
                        ? 'scale-100 shadow-lg shadow-[#00ff88]/20 border-[#00ff88]/50'
                        : 'scale-0'
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                      transitionTimingFunction: 'var(--ease-elastic)',
                    }}
                  >
                    <step.icon className="w-8 h-8 text-[#00ff88]" />
                    {/* Pulse Ring */}
                    <div className="absolute inset-0 rounded-2xl border border-[#00ff88]/30 animate-ping opacity-50" />
                  </div>
                  {/* Step Number Badge */}
                  <div
                    className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#00ff88] flex items-center justify-center transition-all duration-500 ${
                      visibleSteps[index] ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
                    }`}
                    style={{
                      transitionDelay: `${index * 100 + 200}ms`,
                      transitionTimingFunction: 'var(--ease-elastic)',
                    }}
                  >
                    <span className="text-black text-xs font-bold">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`text-center transition-all duration-500 ${
                    visibleSteps[index]
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: `${index * 100 + 300}ms`,
                    transitionTimingFunction: 'var(--ease-expo-out)',
                  }}
                >
                  <h3 className="text-xl font-bold text-white font-['Montserrat'] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#b3b3b3] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            visibleSteps.every((s) => s)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'var(--ease-elastic)',
          }}
        >
          <Button
            onClick={() => navigate('/register')}
            className="btn-primary text-lg px-8 py-4 group"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
