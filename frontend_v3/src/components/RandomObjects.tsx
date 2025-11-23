import { useState, useEffect } from 'react';
import { getVALCObjectNames } from '../api/valc';
import { Button } from './ui/button';

interface RandomObjectsProps {
    onSelectObject: (objectName: string) => void;
}

export function RandomObjects({ onSelectObject }: RandomObjectsProps) {
    const [randomObjects, setRandomObjects] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRandomObjects = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const allNames = await getVALCObjectNames();
            
            // Shuffle array and take 10 random objects
            const shuffled = [...allNames].sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, 10);
            
            setRandomObjects(selected);
        } catch (err) {
            console.error('Error loading random objects:', err);
            setError(err instanceof Error ? err.message : 'Failed to load objects');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadRandomObjects();
    }, []);

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="text-slate-900 mb-4 font-semibold text-lg">Random Objects</h2>
                <p className="text-slate-500">Loading objects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="text-slate-900 mb-4 font-semibold text-lg">Random Objects</h2>
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                    onClick={loadRandomObjects}
                    className="bg-slate-900 text-white hover:bg-slate-800"
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-900 font-semibold text-lg">Random Objects</h2>
                <Button
                    onClick={loadRandomObjects}
                    variant="outline"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900"
                >
                    Refresh
                </Button>
            </div>
            <div className="space-y-2">
                {randomObjects.map((objectName) => (
                    <button
                        key={objectName}
                        onClick={() => onSelectObject(objectName)}
                        className="w-full text-left px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors text-slate-700 hover:text-slate-900"
                    >
                        {objectName}
                    </button>
                ))}
            </div>
        </div>
    );
}

