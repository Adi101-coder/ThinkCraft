import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

const words = ['CREATIVE', 'BOLD', 'DYNAMIC'];

export default function AnimatedMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { gsap, isLoaded } = useGSAP();

  useEffect(() => {
    if (!isLoaded || !gsap || !marqueeRef.current) return;

    const marquee = marqueeRef.current;

    // Create infinite seamless loop animation
    // Move from right edge to left edge continuously and slower
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    tl.fromTo(marquee,
      { x: '100%' },
      {
        x: '-100%',
        duration: 25,
        ease: 'none'
      }
    );

    // Ensure animation never stops by restarting if needed
    const restartAnimation = () => {
      if (!tl.isActive()) {
        tl.restart();
      }
    };

    const intervalId = setInterval(restartAnimation, 1000);

    return () => {
      clearInterval(intervalId);
      tl.kill();
      gsap.killTweensOf(marquee);
    };

    return () => {
      gsap.killTweensOf(marquee);
    };
  }, [isLoaded, gsap]);

  return (
    <section
      ref={sectionRef}
      className="h-screen flex items-center justify-center overflow-hidden bg-white"
      data-testid="animated-marquee"
    >
      <div className="marquee-container w-full relative">
        <div
          ref={marqueeRef}
          className="marquee-content flex whitespace-nowrap absolute"
          style={{ width: 'max-content' }}
        >
          {/* Multiple sets for seamless loop - more sets to ensure continuous effect */}
          {[...Array(12)].map((_, setIndex) => (
            <div key={setIndex} className="flex">
              {words.map((word, wordIndex) => (
                <span
                  key={`${setIndex}-${wordIndex}`}
                  className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase mx-20 text-black"
                  style={{
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}