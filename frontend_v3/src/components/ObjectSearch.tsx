import { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { searchObjects } from '../api/valc';

interface ObjectSearchProps {
  onSearch: (objectName: string) => void;
  onAdvancedSearchClick: () => void;
  isLoading?: boolean;
}

export function ObjectSearch({ onSearch, onAdvancedSearchClick, isLoading = false }: ObjectSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length >= 2) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchObjects('VALC', searchQuery.trim());
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  const handleSelectResult = (objectName: string) => {
    onSearch(objectName);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="flex items-center gap-2 w-full md:w-auto relative" ref={containerRef}>
      <div className="relative w-full md:w-80">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <Input
            placeholder="Enter object name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => {
              if (searchResults.length > 0) {
                setShowResults(true);
              }
            }}
            className="w-full bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-slate-600 pl-10"
            disabled={isLoading}
          />
        </div>
        
        {/* Search results dropdown */}
        {showResults && searchQuery.trim().length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-500"
            style={{ scrollbarColor: '#475569 #1e293b', scrollbarWidth: 'thin' }}>
            {isSearching ? (
              <div className="p-4 text-slate-400 text-center">Searching...</div>
            ) : searchResults.length > 0 ? (
              <div className="p-2">
                <div className="text-slate-400 text-xs mb-2 px-2">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </div>
                <div className="space-y-1">
                  {searchResults.map((objectName) => (
                    <button
                      key={objectName}
                      onClick={() => handleSelectResult(objectName)}
                      className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded border border-slate-600 text-left transition-colors text-white"
                    >
                      <div className="text-sm">{objectName}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 text-slate-400 text-center text-sm">
                No objects found
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* <Button 
        variant="outline"
        onClick={onAdvancedSearchClick}
        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </Button> */}
    </div>
  );
}

