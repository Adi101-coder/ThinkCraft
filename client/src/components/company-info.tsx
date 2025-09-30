import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

const stats = [
  {
    icon: "fas fa-drafting-compass",
    number: 8,
    label: "Years Design Experience",
    description: "Comprehensive expertise in 2D and 3D design across multiple industries."
  },
  {
    icon: "fas fa-handshake", 
    number: 6,
    label: "Years Consulting",
    description: "Strategic design consulting that drives innovation and business growth."
  },
  {
    icon: "fas fa-cube",
    number: 3,
    label: "Years 3D Printing", 
    description: "Cutting-edge 3D printing solutions for rapid prototyping and production."
  }
];

export default function CompanyInfo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement[]>([]);
  const { gsap, ScrollTrigger, isLoaded } = useGSAP();

  useEffect(() => {
    if (!isLoaded || !gsap || !ScrollTrigger || !sectionRef.current) return;

    // Color transition back to white
    const colorTransition = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self: any) => {
        const body = document.body;
        if (self.isActive) {
          body.style.background = 'white';
          body.style.color = 'hsl(0, 0%, 3.9%)';
        }
      }
    });

    // Counter animations
    countersRef.current.forEach((counter, index) => {
      if (!counter) return;
      
      const target = stats[index].number;
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(counter, 
            { textContent: 0 },
            { 
              textContent: target,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              onUpdate: function() {
                const current = Math.ceil(this.targets()[0].textContent);
                counter.textContent = current + '+';
              }
            }
          );
        }
      });
    });

    return () => {
      colorTransition?.kill();
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger && sectionRef.current?.contains(trigger.trigger as Node)) {
          trigger.kill();
        }
      });
    };
  }, [isLoaded, gsap, ScrollTrigger]);

  return (
    <section 
      id="company-info" 
      ref={sectionRef}
      className="py-20 bg-background text-foreground"
      data-testid="company-info"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16" data-testid="company-title">
          Why ThinkCraft
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <i className={`${stat.icon} text-2xl text-primary-foreground`} data-testid={`stat-icon-${index}`}></i>
              </div>
              <div 
                ref={el => { if (el) countersRef.current[index] = el; }}
                className="text-4xl font-bold text-primary mb-2"
                data-counter={stat.number}
                data-testid={`stat-counter-${index}`}
              >
                0
              </div>
              <h3 className="text-xl font-semibold mb-4" data-testid={`stat-label-${index}`}>
                {stat.label}
              </h3>
              <p className="text-muted-foreground" data-testid={`stat-description-${index}`}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
