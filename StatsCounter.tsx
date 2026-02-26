import { useEffect, useRef, useState } from 'react';
import { Users, DollarSign, Trophy, TrendingUp } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: 2500,
    suffix: '+',
    prefix: '',
    label: 'Active Investors',
  },
  {
    icon: DollarSign,
    value: 1.2,
    suffix: 'M+',
    prefix: '$',
    label: 'Winnings Shared',
  },
  {
    icon: Trophy,
    value: 450,
    suffix: '+',
    prefix: '',
    label: 'Verified Players',
  },
  {
    icon: TrendingUp,
    value: 89,
    suffix: '%',
    prefix: '',
    label: 'Avg Investor ROI',
  },
];

function AnimatedCounter({
  value,
  prefix,
  suffix,
  isVisible,
}: {
  value: number;
  prefix: string;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        // Use easeOutExpo curve
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCount(value * easedProgress);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const displayValue = value < 1 ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return (
    <span className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 via-transparent to-[#00ff88]/5 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 136, 0.03) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 10s ease infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0d0d0d] border border-[#333333] flex items-center justify-center group hover:border-[#00ff88]/50 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-[#00ff88]" />
                </div>
              </div>

              {/* Value */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Montserrat'] mb-2 pulse-glow">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>

              {/* Label */}
              <p
                className={`text-[#b3b3b3] text-sm transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${index * 150 + 200}ms`,
                  transitionTimingFunction: 'var(--ease-expo-out)',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
