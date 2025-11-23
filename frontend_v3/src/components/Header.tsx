import { StarObject, starObjects } from '../App';
import { ObjectSearch } from './ObjectSearch';

interface HeaderProps {
  selectedObject: StarObject;
  onObjectSelect: (object: StarObject) => void;
  onAboutClick: () => void;
  onAdvancedSearchClick: () => void;
}

export function Header({ selectedObject, onObjectSelect, onAboutClick, onAdvancedSearchClick }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.svg" 
              alt="Light curves logo" 
              className="w-10 h-10"
            />
            <span className="text-white text-lg font-semibold">Light curves</span>
          </div>
          
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
          objects={starObjects}
          selectedObject={selectedObject}
          onSelectObject={onObjectSelect}
          onAdvancedSearchClick={onAdvancedSearchClick}
        />
      </div>
    </header>
  );
}

