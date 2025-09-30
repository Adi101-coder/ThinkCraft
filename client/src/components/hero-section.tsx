import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger, isLoaded } = useGSAP();

  useEffect(() => {
    if (!isLoaded || !gsap || !ScrollTrigger || !heroRef.current) return;

    const heroLines = heroRef.current.querySelectorAll('.hero-line');
    
    gsap.set(heroLines, { opacity: 1, x: 0 });
    
    const scrollTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self: any) => {
        heroLines.forEach((line: Element, index: number) => {
          const direction = (line as HTMLElement).dataset.direction;
          const progress = self.progress;
          const moveDirection = direction === 'right' ? 200 : -200;
          
          gsap.set(line, {
            x: progress * moveDirection,
            opacity: 1 - progress
          });
        });
      }
    });

    return () => {
      scrollTrigger?.kill();
    };
  }, [isLoaded, gsap, ScrollTrigger]);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden"
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 md:space-y-8">
          <div className="hero-line hero-text text-right" data-direction="right" data-testid="hero-line-1">
            TRANSFORMING IDEAS
          </div>
          <div className="hero-line hero-text text-left ml-20" data-direction="left" data-testid="hero-line-2">
            INTO REALITY
          </div>
          <div className="hero-line hero-text text-right" data-direction="right" data-testid="hero-line-3">
            THROUGH INNOVATIVE
          </div>
          <div className="hero-line hero-text text-left ml-10" data-direction="left" data-testid="hero-line-4">
            DESIGN & 3D PRINTING
          </div>
        </div>
        <div className="mt-16 text-center opacity-70">
          <p className="text-muted-foreground mb-4" data-testid="scroll-indicator-text">Scroll to explore</p>
          <div className="inline-block animate-bounce">
            <i className="fas fa-chevron-down text-primary text-2xl" data-testid="scroll-indicator-arrow"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
