import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { StarObject } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AdvancedSearchProps {
  objects: StarObject[];
  onSelectObject: (object: StarObject) => void;
}

export function AdvancedSearch({ objects, onSelectObject }: AdvancedSearchProps) {
  const [nameQuery, setNameQuery] = useState('');
  const [raQuery, setRaQuery] = useState('');
  const [decQuery, setDecQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StarObject[]>([]);

  const handleSearch = () => {
    const results = objects.filter(obj => {
      const nameMatch = !nameQuery || obj.name.toLowerCase().includes(nameQuery.toLowerCase());
      const raMatch = !raQuery || obj.ra.toLowerCase().includes(raQuery.toLowerCase());
      const decMatch = !decQuery || obj.dec.toLowerCase().includes(decQuery.toLowerCase());
      
      return nameMatch && raMatch && decMatch;
    });
    
    setSearchResults(results);
  };

  const handleClear = () => {
    setNameQuery('');
    setRaQuery('');
    setDecQuery('');
    setSearchResults([]);
  };

  return (
    <div className="bg-white border-b border-slate-300 shadow-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor="name-search" className="text-slate-700 mb-2 block">
              Object Name
            </Label>
            <Input
              id="name-search"
              placeholder="e.g., ESI_J064508..."
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              className="bg-white border-slate-300"
            />
          </div>
          
          <div>
            <Label htmlFor="ra-search" className="text-slate-700 mb-2 block">
              Right Ascension
            </Label>
            <Input
              id="ra-search"
              placeholder="e.g., 06h 45m 08.9s"
              value={raQuery}
              onChange={(e) => setRaQuery(e.target.value)}
              className="bg-white border-slate-300"
            />
          </div>
          
          <div>
            <Label htmlFor="dec-search" className="text-slate-700 mb-2 block">
              Declination
            </Label>
            <Input
              id="dec-search"
              placeholder="e.g., -16° 42' 58&quot;"
              value={decQuery}
              onChange={(e) => setDecQuery(e.target.value)}
              className="bg-white border-slate-300"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button 
            onClick={handleClear}
            variant="outline"
            className="border-slate-300"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="mt-4 border border-slate-300 rounded-lg bg-slate-50 max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="text-slate-700 mb-2">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              <div className="space-y-1">
                {searchResults.map((object) => (
                  <button
                    key={object.id}
                    onClick={() => {
                      onSelectObject(object);
                      handleClear();
                    }}
                    className="w-full px-3 py-2 bg-white hover:bg-blue-50 rounded border border-slate-200 text-left transition-colors"
                  >
                    <div className="text-slate-900">{object.name}</div>
                    <div className="text-slate-600 text-xs">
                      RA: {object.ra} | Dec: {object.dec} | Type: {object.type}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {searchResults.length === 0 && (nameQuery || raQuery || decQuery) && (
          <div className="mt-4 p-4 border border-slate-300 rounded-lg bg-slate-50 text-center text-slate-600">
            No objects found matching the search criteria
          </div>
        )}
      </div>
    </div>
  );
}

