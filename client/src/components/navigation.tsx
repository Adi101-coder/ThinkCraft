import { useRef } from 'react';

export default function Navigation() {
  const navRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="nav-floating fixed top-4 left-4 right-4 z-50 rounded-full px-6 py-3"
      data-testid="floating-nav"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center" data-testid="logo">
          <img 
            src="/logo.svg" 
            alt="Think Craft Lab Logo" 
            className="h-8 md:h-10 w-auto"
          />
        </div>
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('hero')}
            className="nav-link text-foreground hover:text-primary transition-all duration-300 relative group px-3 py-2 rounded-lg overflow-hidden"
            data-testid="nav-home"
          >
            <span className="relative z-10">Home</span>
            <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('work-showcase')}
            className="nav-link text-foreground hover:text-primary transition-all duration-300 relative group px-3 py-2 rounded-lg overflow-hidden"
            data-testid="nav-shop"
          >
            <span className="relative z-10">Shop</span>
            <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('work-showcase')}
            className="nav-link text-foreground hover:text-primary transition-all duration-300 relative group px-3 py-2 rounded-lg overflow-hidden"
            data-testid="nav-work"
          >
            <span className="relative z-10">Work</span>
            <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('company-info')}
            className="nav-link text-foreground hover:text-primary transition-all duration-300 relative group px-3 py-2 rounded-lg overflow-hidden"
            data-testid="nav-about"
          >
            <span className="relative z-10">About Us</span>
            <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button 
            onClick={() => scrollToSection('footer')}
            className="nav-link text-foreground hover:text-primary transition-all duration-300 relative group px-3 py-2 rounded-lg overflow-hidden"
            data-testid="nav-contact"
          >
            <span className="relative z-10">Contact</span>
            <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
        <button className="md:hidden text-foreground" data-testid="mobile-menu">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </nav>
  );
}
