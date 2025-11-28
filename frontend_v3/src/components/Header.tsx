import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ObjectSearch } from './ObjectSearch';
import { FULU_URL } from '../config';

interface HeaderProps {
  onSearch: (objectName: string) => void;
  onAboutClick: () => void;
  onAdvancedSearchClick: () => void;
  isLoading?: boolean;
}

export function Header({ onSearch, onAboutClick, onAdvancedSearchClick, isLoading = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a 
              href="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src="/logo.svg" 
                alt="Light curves logo" 
                className="w-10 h-10"
              />
              <span className="text-white text-lg font-semibold">Light curves</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={onAboutClick}
                className="text-slate-300 hover:text-white transition-colors font-medium"
              >
                About
              </button>
              <a 
                href={FULU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors no-underline font-medium"
              >
                Fulu library
              </a>
            </nav>
          </div>

          <div className="hidden md:block">
            <ObjectSearch
              onSearch={onSearch}
              onAdvancedSearchClick={onAdvancedSearchClick}
              isLoading={isLoading}
            />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800">
            <nav className="flex flex-col gap-4 mt-4">
              <button 
                onClick={() => {
                  onAboutClick();
                  setIsMobileMenuOpen(false);
                }}
                className="text-slate-300 hover:text-white transition-colors font-medium text-left"
              >
                About
              </button>
              <a 
                href={FULU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors no-underline font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fulu library
              </a>
            </nav>
            <div className="mt-4">
              <ObjectSearch
                onSearch={(name) => {
                  onSearch(name);
                  setIsMobileMenuOpen(false);
                }}
                onAdvancedSearchClick={onAdvancedSearchClick}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

