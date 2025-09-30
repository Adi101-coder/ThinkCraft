import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

const textPhrases = [
  "At Think Craft Lab, we are fueled by a passion for innovation",
  "and a commitment to excellence in 2D and 3D designing,",
  "design consulting, and 3D printing.",
  "With a team of seasoned design engineers having",
  "approximately eight years of expertise in designing,",
  "six years in consulting, and three years specialization",
  "in 3D printing, we bring a wealth of experience",
  "to every project. We transform ideas into reality,",
  "ensuring innovation, precision, and reliability",
  "in every creation we deliver."
];

export default function TextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger, isLoaded } = useGSAP();

  useEffect(() => {
    if (!isLoaded || !gsap || !ScrollTrigger || !sectionRef.current) return;

    const revealSpans = sectionRef.current.querySelectorAll('.text-reveal');
    
    revealSpans.forEach((span: Element, index: number) => {
      ScrollTrigger.create({
        trigger: span,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(span, {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1
          });
        },
        onLeave: () => {
          gsap.to(span, {
            opacity: 0.5,
            duration: 0.3
          });
        },
        onEnterBack: () => {
          gsap.to(span, {
            opacity: 1,
            duration: 0.5
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger && revealSpans[0] && trigger.trigger.contains(revealSpans[0])) {
          trigger.kill();
        }
      });
    };
  }, [isLoaded, gsap, ScrollTrigger]);

  return (
    <section 
      id="text-reveal" 
      ref={sectionRef}
      className="py-20 bg-primary text-primary-foreground"
      data-testid="text-reveal-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-2xl md:text-4xl leading-relaxed space-y-4" data-testid="reveal-text">
          {textPhrases.map((phrase, index) => (
            <span 
              key={index}
              className="text-reveal block"
              data-testid={`text-phrase-${index}`}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
