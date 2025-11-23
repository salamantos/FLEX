import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ObjectSearchProps {
  onSearch: (objectName: string) => void;
  onAdvancedSearchClick: () => void;
  isLoading?: boolean;
}

export function ObjectSearch({ onSearch, onAdvancedSearchClick, isLoading = false }: ObjectSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter object name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-80 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-slate-600"
          disabled={isLoading}
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
          variant="outline"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
      
      <Button 
        variant="outline"
        onClick={onAdvancedSearchClick}
        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
}

