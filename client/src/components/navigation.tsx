import { useRef, useState, useEffect } from 'react';

export default function Navigation() {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      ref={navRef}
      className="nav-floating absolute top-4 left-4 right-4 z-50 rounded-full px-6 py-3"
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
        {/* Hamburger Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-primary/10 transition-colors duration-300" 
          data-testid="mobile-menu"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-md border-l border-border shadow-2xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <img 
                src="/logo.svg" 
                alt="Think Craft Lab Logo" 
                className="h-8 w-auto"
              />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors duration-300"
                aria-label="Close mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className="block w-5 h-0.5 bg-current rotate-45 translate-y-0"></span>
                  <span className="block w-5 h-0.5 bg-current -rotate-45 -translate-y-0"></span>
                </div>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-6 py-8">
              <div className="space-y-6">
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="block w-full text-left text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-3 border-b border-border/50"
                  data-testid="mobile-nav-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('work-showcase')}
                  className="block w-full text-left text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-3 border-b border-border/50"
                  data-testid="mobile-nav-shop"
                >
                  Shop
                </button>
                <button 
                  onClick={() => scrollToSection('work-showcase')}
                  className="block w-full text-left text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-3 border-b border-border/50"
                  data-testid="mobile-nav-work"
                >
                  Work
                </button>
                <button 
                  onClick={() => scrollToSection('company-info')}
                  className="block w-full text-left text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-3 border-b border-border/50"
                  data-testid="mobile-nav-about"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('footer')}
                  className="block w-full text-left text-lg font-medium text-foreground hover:text-primary transition-colors duration-300 py-3 border-b border-border/50"
                  data-testid="mobile-nav-contact"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                © 2024 Think Craft Lab
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
