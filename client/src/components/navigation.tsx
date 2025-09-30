import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`nav-floating fixed top-4 left-4 right-4 z-50 rounded-full px-6 py-3 ${isHidden ? 'hidden' : ''}`}
      data-testid="floating-nav"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="font-bold text-xl text-foreground" data-testid="logo">ThinkCraft</div>
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-foreground hover:text-primary transition-colors relative group"
            data-testid="nav-home"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('work-showcase')}
            className="text-foreground hover:text-primary transition-colors relative group"
            data-testid="nav-shop"
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('work-showcase')}
            className="text-foreground hover:text-primary transition-colors relative group"
            data-testid="nav-work"
          >
            Work
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('company-info')}
            className="text-foreground hover:text-primary transition-colors relative group"
            data-testid="nav-about"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('footer')}
            className="text-foreground hover:text-primary transition-colors relative group"
            data-testid="nav-contact"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </button>
        </div>
        <button className="md:hidden text-foreground" data-testid="mobile-menu">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </nav>
  );
}
