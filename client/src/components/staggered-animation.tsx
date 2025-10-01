import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

const words = [
  { text: "EXPECT", direction: "left" },
  { text: "BRAVE", direction: "right" },
  { text: "INNOVATIVE", direction: "left" },
  { text: "SOLUTIONS", direction: "right" },
  { text: "DESIGNED", direction: "left" },
  { text: "FOR YOU", direction: "right" }
];

export default function StaggeredAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);
  const { gsap, ScrollTrigger, isLoaded } = useGSAP();

  useEffect(() => {
    if (!isLoaded || !gsap || !ScrollTrigger || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    wordsRef.current.forEach((word, index) => {
      if (!word) return;
      
      const direction = words[index].direction;
      const startX = direction === 'left' ? -200 : 200;
      
      tl.fromTo(word, 
        {
          x: startX,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, 
        index * 0.3
      )
      .to(word, 
        {
          x: direction === 'left' ? 200 : -200,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
        }, 
        index * 0.3 + 0.8
      );
    });

    return () => {
      tl.kill();
    };
  }, [isLoaded, gsap, ScrollTrigger]);

  return (
    <section 
      id="staggered-animation" 
      ref={sectionRef}
      className="h-screen bg-primary text-primary-foreground relative overflow-hidden flex items-center justify-center"
      data-testid="staggered-animation"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {words.map((word, index) => (
          <div
            key={index}
            ref={el => { if (el) wordsRef.current[index] = el; }}
            className="parallax-word absolute"
            style={{
              top: `${40 + (index * 8)}%`,
              left: word.direction === 'left' ? '20%' : '60%',
              transform: 'translate(-50%, -50%)'
            }}
            data-word={word.text}
            data-direction={word.direction}
            data-testid={`parallax-word-${index}`}
          >
            {word.text}
          </div>
        ))}
      </div>
    </section>
  );
}
