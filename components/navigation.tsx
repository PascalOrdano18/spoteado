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
import { useState } from "react";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Waves className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">SPOTEADO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/map" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Map className="h-4 w-4" />
            <span>Map</span>
          </Link>
          <Link 
            href="/spots" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Waves className="h-4 w-4" />
            <span>Spots</span>
          </Link>
          <Link 
            href="/gallery" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Camera className="h-4 w-4" />
            <span>Gallery</span>
          </Link>
          <Link 
            href="/upload" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button
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
        <div className="md:hidden border-t bg-background">
          <nav className="container flex flex-col space-y-2 p-4">
            <Link 
              href="/map" 
              className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Map className="h-4 w-4" />
              <span>Map</span>
            </Link>
            <Link 
              href="/spots" 
              className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Waves className="h-4 w-4" />
              <span>Spots</span>
            </Link>
            <Link 
              href="/gallery" 
              className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Camera className="h-4 w-4" />
              <span>Gallery</span>
            </Link>
            <Link 
              href="/upload" 
              className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
