import { useState } from 'react';
import { Search, Check, SlidersHorizontal } from 'lucide-react';
import { StarObject } from '../App';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ObjectSearchProps {
  objects: StarObject[];
  selectedObject: StarObject;
  onSelectObject: (object: StarObject) => void;
  onAdvancedSearchClick: () => void;
}

export function ObjectSearch({ objects, selectedObject, onSelectObject, onAdvancedSearchClick }: ObjectSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredObjects = objects.filter(obj =>
    obj.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (object: StarObject) => {
    onSelectObject(object);
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-80 justify-between bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
            <span>{selectedObject.name}</span>
            <Search className="w-4 h-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-slate-800 border-slate-700" align="end">
          <div className="p-2 border-b border-slate-700">
            <Input
              placeholder="Search objects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filteredObjects.map((object) => (
              <button
                key={object.id}
                onClick={() => handleSelect(object)}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-slate-700 text-left"
              >
                <div>
                  <div className="text-white">{object.name}</div>
                  <div className="text-slate-400">{object.type}</div>
                </div>
                {selectedObject.id === object.id && (
                  <Check className="w-4 h-4 text-blue-400" />
                )}
              </button>
            ))}
            {filteredObjects.length === 0 && (
              <div className="px-3 py-8 text-center text-slate-500">
                No objects found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      
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

