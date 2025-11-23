import { ObjectSearch } from './ObjectSearch';

interface HeaderProps {
  onSearch: (objectName: string) => void;
  onAboutClick: () => void;
  onAdvancedSearchClick: () => void;
  isLoading?: boolean;
}

export function Header({ onSearch, onAboutClick, onAdvancedSearchClick, isLoading = false }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
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
          
          <nav className="flex items-center gap-6">
            <button 
              onClick={onAboutClick}
              className="text-slate-300 hover:text-white transition-colors"
            >
              About
            </button>
          </nav>
        </div>

        <ObjectSearch
          onSearch={onSearch}
          onAdvancedSearchClick={onAdvancedSearchClick}
          isLoading={isLoading}
        />
      </div>
    </header>
  );
}

