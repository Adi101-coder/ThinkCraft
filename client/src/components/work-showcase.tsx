import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

const carouselItems = [
  {
    number: "01",
    title: "Prototype products in days, not months",
    description: "Transform your concepts into physical prototypes with unprecedented speed and precision."
  },
  {
    number: "02", 
    title: "Reduce manufacturing costs by 40%",
    description: "Optimize your production process and eliminate unnecessary expenses through smart design."
  },
  {
    number: "03",
    title: "Unlock limitless design possibilities", 
    description: "Break free from traditional manufacturing constraints and explore innovative solutions."
  },
  {
    number: "04",
    title: "Transform complex ideas into tangible objects",
    description: "Bridge the gap between imagination and reality with our advanced 3D printing capabilities."
  },
  {
    number: "05",
    title: "Iterate designs without expensive tooling",
    description: "Perfect your designs through rapid iteration without the overhead of traditional tooling costs."
  }
];

const workProjects = [
  {
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Architecture",
    title: "Geometric Building Model"
  },
  {
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", 
    category: "Product Design",
    title: "Consumer Electronics"
  },
  {
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    category: "Engineering", 
    title: "Precision Components"
  }
];

export default function WorkShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { gsap, ScrollTrigger, isLoaded } = useGSAP();

  useEffect(() => {
    if (!isLoaded || !gsap || !ScrollTrigger || !sectionRef.current) return;

    // Color transition effect when entering this section
    const colorTransition = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self: any) => {
        const body = document.body;
        if (self.isActive) {
          body.style.background = 'hsl(21, 100%, 51%)';
          body.style.color = 'white';
        } else {
          body.style.background = 'white';
          body.style.color = 'hsl(0, 0%, 3.9%)';
        }
      }
    });

    return () => {
      colorTransition?.kill();
    };
  }, [isLoaded, gsap, ScrollTrigger]);

  const updateCarousel = () => {
    if (!trackRef.current) return;
    
    const cardWidth = trackRef.current.children[0]?.getBoundingClientRect().width || 0;
    const gap = 32; // 2rem gap
    const translateX = -(currentIndex * (cardWidth + gap));
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${translateX}px)`;
    }
  };

  useEffect(() => {
    updateCarousel();
    
    const handleResize = () => updateCarousel();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : carouselItems.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev < carouselItems.length - 1 ? prev + 1 : 0);
  };

  return (
    <section 
      id="work-showcase" 
      ref={sectionRef}
      className="min-h-screen py-20 bg-primary text-primary-foreground"
      data-testid="work-showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16" data-testid="showcase-title">
          ASK YOURSELF — WHAT IF YOU COULD:
        </h2>
        
        {/* Carousel */}
        <div className="carousel-container mb-16" data-testid="carousel-container">
          <div 
            ref={trackRef}
            className="carousel-track"
            data-testid="carousel-track"
          >
            {carouselItems.map((item, index) => (
              <div key={index} className="carousel-card" data-testid={`carousel-card-${index}`}>
                <div className="text-2xl md:text-4xl font-semibold mb-4" data-testid={`card-number-${index}`}>
                  {item.number}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4" data-testid={`card-title-${index}`}>
                  {item.title}
                </h3>
                <p className="text-lg opacity-90" data-testid={`card-description-${index}`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button 
              onClick={goToPrev}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              data-testid="carousel-prev"
            >
              <i className="fas fa-chevron-left text-white"></i>
            </button>
            <div className="flex space-x-2" data-testid="carousel-dots">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                  data-testid={`carousel-dot-${index}`}
                />
              ))}
            </div>
            <button 
              onClick={goToNext}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              data-testid="carousel-next"
            >
              <i className="fas fa-chevron-right text-white"></i>
            </button>
          </div>
        </div>

        {/* Featured Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="work-grid">
          {workProjects.map((project, index) => (
            <div key={index} className="group cursor-pointer" data-testid={`work-project-${index}`}>
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  data-testid={`project-image-${index}`}
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
              </div>
              <div className="mt-4">
                <span 
                  className="text-sm bg-white/20 px-3 py-1 rounded-full"
                  data-testid={`project-category-${index}`}
                >
                  {project.category}
                </span>
                <h3 
                  className="text-xl font-semibold mt-2"
                  data-testid={`project-title-${index}`}
                >
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
