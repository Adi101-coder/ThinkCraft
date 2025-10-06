import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

const textContent = "At Think Craft Lab,\u00A0we are fueled by innovation and excellence in 2D and 3D design,\u00A0consulting,\u00A0and advanced 3D printing solutions. With eight years of expertise,\u00A0we transform bold ideas into tangible reality with precision. Our approach combines technical mastery with creative vision,\u00A0delivering solutions that drive business success and exceed expectations.";

export default function TextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger, isLoaded } = useGSAP();

  // Split text into words, then each word into characters
  const splitTextIntoWords = (text: string) => {
    return text.split(' ').map((word, wordIndex) => ({
      word,
      wordIndex,
      chars: word.split('').map((char, charIndex) => ({
        char,
        charIndex,
        globalIndex: text.substring(0, text.indexOf(word) + charIndex).length
      }))
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
      onUpdate: (self: any) => {
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
        <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold" data-testid="reveal-text" style={{ fontFamily: 'Inter, Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: '400', letterSpacing: '-0.02em', lineHeight: '1.3', wordBreak: 'keep-all', hyphens: 'none', overflowWrap: 'normal', whiteSpace: 'pre-wrap' }}>
          <p className="text-reveal-paragraph prevent-word-break" data-testid="text-paragraph">
            {splitTextIntoWords(textContent).map((wordObj, wordIndex) => (
              <span key={wordIndex} className="word-container inline-block" style={{ whiteSpace: 'nowrap' }}>
                {wordObj.chars.map((charObj, charIndex) => (
                  <span
                    key={`${wordIndex}-${charIndex}`}
                    className="char inline-block"
                    data-global-index={wordObj.chars.reduce((acc, _, i) => i <= charIndex ? acc + 1 : acc, 
                      textContent.substring(0, textContent.split(' ').slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0)).length)}
                    style={{
                      transition: 'color 0.2s ease, opacity 0.2s ease'
                    }}
                  >
                    {charObj.char}
                  </span>
                ))}
                {wordIndex < splitTextIntoWords(textContent).length - 1 && (
                  <span className="char inline-block" 
                    data-global-index={textContent.substring(0, textContent.split(' ').slice(0, wordIndex + 1).join(' ').length).length}
                    style={{ transition: 'color 0.2s ease, opacity 0.2s ease' }}>
                    &nbsp;
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
