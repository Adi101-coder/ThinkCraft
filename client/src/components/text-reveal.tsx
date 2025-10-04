import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

const textContent = "At Think Craft Lab, we are fueled by a passion for innovation and a commitment to excellence in 2D and 3D designing, design consulting, and advanced 3D printing solutions. With a team of seasoned design engineers having approximately eight years of expertise in designing, six years in consulting, and three years specialization in 3D printing technologies, we bring a wealth of experience and cutting-edge knowledge to every project we undertake. We transform ideas into reality, ensuring innovation, precision, and reliability in every creation we deliver. Our comprehensive approach combines technical expertise with creative vision to exceed client expectations and deliver solutions that drive business success.";

export default function TextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger, isLoaded } = useGSAP();

  // Split text into individual characters
  const splitTextIntoChars = (text: string) => {
    return text.split('').map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char, // Use non-breaking space
      index
    }));
  };

  useEffect(() => {
    if (!isLoaded || !gsap || !ScrollTrigger || !sectionRef.current) return;

    const section = sectionRef.current;
    const allChars = section.querySelectorAll('.char');
    
    // Set initial state - all characters are dim
    gsap.set(allChars, {
      opacity: 0.3,
      color: 'rgba(255, 255, 255, 0.3)'
    });

    // Simple character highlighting on scroll
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalChars = allChars.length;
        const charsToHighlight = Math.floor(progress * totalChars);

        allChars.forEach((char, index) => {
          if (index <= charsToHighlight) {
            // Highlighted characters - simple white
            gsap.to(char, {
              opacity: 1,
              color: '#ffffff',
              duration: 0.2
            });
          } else {
            // Unhighlighted characters - dim
            gsap.to(char, {
              opacity: 0.3,
              color: 'rgba(255, 255, 255, 0.3)',
              duration: 0.2
            });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [isLoaded, gsap, ScrollTrigger]);

  return (
    <section 
      id="text-reveal" 
      ref={sectionRef}
      className="py-20 bg-primary text-primary-foreground relative overflow-hidden"
      data-testid="text-reveal-section"
      style={{
        backgroundColor: '#FF5D05',
        boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-2xl md:text-4xl lg:text-5xl leading-loose font-bold" data-testid="reveal-text" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: '700', lineHeight: '1.8' }}>
          <p className="text-reveal-paragraph" data-testid="text-paragraph">
            {splitTextIntoChars(textContent).map((charObj, charIndex) => (
              <span
                key={charIndex}
                className="char inline-block"
                style={{
                  transition: 'color 0.2s ease, opacity 0.2s ease'
                }}
              >
                {charObj.char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
