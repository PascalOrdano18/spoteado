"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { 
  Map, 
  Camera, 
  Waves, 
  Upload, 
  Moon, 
  Sun, 
  Search,
  Menu
} from "lucide-react";
import { useState, useEffect } from "react";
import { GlobalSearch } from "@/components/global-search";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle hash navigation on page load
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      const navbarHeight = 64;
      
      if (hash === '#spots-section') {
        setTimeout(() => {
          const spotsSection = document.getElementById('spots-section');
          if (spotsSection) {
            const elementPosition = spotsSection.offsetTop - navbarHeight - 16;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }, 100); // Small delay to ensure DOM is ready
      } else if (hash === '#map-section') {
        setTimeout(() => {
          const mapSection = document.getElementById('map-section');
          if (mapSection) {
            const elementPosition = mapSection.offsetTop - navbarHeight - 16;
            
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Handle initial load
    handleHashNavigation();

    // Handle hash changes (back/forward navigation)
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  // Function to handle map navigation
  const handleMapClick = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      // If we're on the home page and map section exists, scroll to it
      const navbarHeight = 64; // Height of the navbar (h-16 = 4rem = 64px)
      const elementPosition = mapSection.offsetTop - navbarHeight - 16; // Extra 16px padding
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      // If we're not on the home page, navigate to home page with hash
      window.location.href = '/#map-section';
    }
  };

  // Function to handle spots navigation
  const handleSpotsClick = () => {
    const spotsSection = document.getElementById('spots-section');
    if (spotsSection) {
      // If we're on the home page and spots section exists, scroll to it
      const navbarHeight = 64; // Height of the navbar (h-16 = 4rem = 64px)
      const elementPosition = spotsSection.offsetTop - navbarHeight - 16; // Extra 16px padding
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      // If we're not on the home page, navigate to home page with hash
      window.location.href = '/#spots-section';
    }
  };

  return (
    <header className="sticky top-0 z-[9999] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-12 relative">
        {/* Logo - Left Side */}
        <div className="absolute left-12">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-foreground">SPOTEADO</span>
              <span className="text-sm text-muted-foreground font-medium tracking-wide">Encontra tu Ola</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <button 
            onClick={handleMapClick}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Map className="h-4 w-4" />
            <span>Mapa</span>
          </button>
          <button 
            onClick={handleSpotsClick}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Waves className="h-4 w-4" />
            <span>Spots</span>
          </button>
          <Link 
            href="/gallery" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Camera className="h-4 w-4" />
            <span>Galería</span>
          </Link>
          <Link 
            href="/upload" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Subir</span>
          </Link>
        </nav>

        {/* Actions - Right Side */}
        <div className="flex items-center space-x-2 absolute right-12">
          <Button 
            className="hover:cursor-pointer"
            variant="ghost" 
            size="icon"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            className="hover:cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background z-[9999]">
          <nav className="flex flex-col space-y-2 px-12 py-4">
            <button 
              className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-full text-left"
              onClick={() => {
                setIsMenuOpen(false);
                handleMapClick();
              }}
            >
              <Map className="h-4 w-4" />
              <span>Mapa</span>
            </button>
            <button 
              className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-full text-left"
              onClick={() => {
                setIsMenuOpen(false);
                handleSpotsClick();
              }}
            >
              <Waves className="h-4 w-4" />
              <span>Spots</span>
            </button>
            <Link 
              href="/gallery" 
              className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Camera className="h-4 w-4" />
              <span>Galería</span>
            </Link>
            <Link 
              href="/upload" 
              className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Upload className="h-4 w-4" />
              <span>Subir</span>
            </Link>
          </nav>
        </div>
      )}

      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
}
