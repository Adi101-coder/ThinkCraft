import { useEffect } from 'react';
import { useGSAP } from '@/hooks/use-gsap';

export default function Footer() {
  const { gsap, isLoaded } = useGSAP();

  const scrollToTop = () => {
    if (gsap) {
      gsap.to(window, { scrollTo: 0, duration: 1.5, ease: "power2.inOut" });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isLoaded || !gsap) return;

    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    const handleScroll = () => {
      if (window.scrollY > 500) {
        gsap.to(backToTopBtn, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(backToTopBtn, { opacity: 0, duration: 0.3 });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded, gsap]);

  return (
    <>
      <footer id="footer" className="bg-muted text-foreground py-16" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Quick Links */}
            <div data-testid="footer-links">
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left"
                  data-testid="footer-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('work-showcase')}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left"
                  data-testid="footer-shop"
                >
                  Shop
                </button>
                <button 
                  onClick={() => scrollToSection('work-showcase')}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left"
                  data-testid="footer-work"
                >
                  Work
                </button>
                <button 
                  onClick={() => scrollToSection('company-info')}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left"
                  data-testid="footer-about"
                >
                  About
                </button>
              </div>
            </div>
            
            {/* Services */}
            <div data-testid="footer-services">
              <h3 className="text-xl font-semibold mb-6">Services</h3>
              <div className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="service-3d-printing">
                  3D Printing
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="service-consulting">
                  Design Consulting
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="service-prototyping">
                  Prototyping
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors" data-testid="service-custom">
                  Custom Solutions
                </a>
              </div>
            </div>
            
            {/* Connect */}
            <div data-testid="footer-connect">
              <h3 className="text-xl font-semibold mb-6">Connect</h3>
              <div className="space-y-3">
                <p className="text-muted-foreground" data-testid="contact-email">
                  <i className="fas fa-envelope text-primary mr-2"></i>
                  connect@thinkcraftlab.com
                </p>
                <p className="text-muted-foreground" data-testid="contact-phone">
                  <i className="fas fa-phone text-primary mr-2"></i>
                  +91 9889804044
                </p>
                <p className="text-muted-foreground" data-testid="contact-location">
                  <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                  Bareilly, UP
                </p>
                <div className="flex space-x-4 mt-6" data-testid="social-links">
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors text-xl" data-testid="social-linkedin">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors text-xl" data-testid="social-instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors text-xl" data-testid="social-twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground" data-testid="copyright">
              © 2025 ThinkCraft Lab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        id="back-to-top"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg opacity-0 transition-all duration-300 hover:scale-110 z-40"
        data-testid="back-to-top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
}
