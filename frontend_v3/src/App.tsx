import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ObjectCharts } from './components/ObjectCharts';
import { ObjectParameters } from './components/ObjectParameters';
import { AboutDialog } from './components/AboutDialog';
import { AdvancedSearch } from './components/AdvancedSearch';
import { Aladin } from './components/Aladin';
import { ObjectImages } from './components/ObjectImages';
import { getVALCData } from './api/valc';
import { DataVALC } from './types/api';

// Mock star object data (kept for AdvancedSearch if needed)
export interface StarObject {
    id: string;
    name: string;
    type: string;
    magnitude: number;
    distance: number; // light years
    temperature: number; // Kelvin
    mass: number; // solar masses
    radius: number; // solar radii
    luminosity: number; // solar luminosities
    ra: string; // right ascension
    dec: string; // declination
}

export const starObjects: StarObject[] = [
    { id: '1', name: 'ESI_J125710.76+272417.6', type: 'Main Sequence', magnitude: -1.46, distance: 8.6, temperature: 9940, mass: 2.06, radius: 1.711, luminosity: 25.4, ra: '06h 45m 08.9s', dec: '-16° 42\' 58"' },
    { id: '2', name: 'Betelgeuse', type: 'Red Supergiant', magnitude: 0.50, distance: 642.5, temperature: 3500, mass: 16.5, radius: 764, luminosity: 126000, ra: '05h 55m 10.3s', dec: '+07° 24\' 25"' },
    { id: '3', name: 'Rigel', type: 'Blue Supergiant', magnitude: 0.13, distance: 860, temperature: 11000, mass: 21, radius: 78.9, luminosity: 120000, ra: '05h 14m 32.3s', dec: '-08° 12\' 06"' },
    { id: '4', name: 'Proxima Centauri', type: 'Red Dwarf', magnitude: 11.13, distance: 4.24, temperature: 3042, mass: 0.12, radius: 0.154, luminosity: 0.0017, ra: '14h 29m 43.0s', dec: '-62° 40\' 46"' },
    { id: '5', name: 'Vega', type: 'Main Sequence', magnitude: 0.03, distance: 25, temperature: 9602, mass: 2.135, radius: 2.362, luminosity: 40.12, ra: '18h 36m 56.3s', dec: '+38° 47\' 01"' },
    { id: '6', name: 'Arcturus', type: 'Red Giant', magnitude: -0.05, distance: 36.7, temperature: 4286, mass: 1.08, radius: 25.4, luminosity: 170, ra: '14h 15m 39.7s', dec: '+19° 10\' 56"' },
    { id: '7', name: 'Altair', type: 'Main Sequence', magnitude: 0.77, distance: 16.73, temperature: 7550, mass: 1.79, radius: 1.63, luminosity: 10.6, ra: '19h 50m 47.0s', dec: '+08° 52\' 06"' },
    { id: '8', name: 'Aldebaran', type: 'Red Giant', magnitude: 0.85, distance: 65.3, temperature: 3910, mass: 1.16, radius: 44.2, luminosity: 439, ra: '04h 35m 55.2s', dec: '+16° 30\' 33"' },
    { id: '9', name: 'Spica', type: 'Blue Giant', magnitude: 1.04, distance: 250, temperature: 22400, mass: 11.43, radius: 7.47, luminosity: 20512, ra: '13h 25m 11.6s', dec: '-11° 09\' 41"' },
    { id: '10', name: 'Antares', type: 'Red Supergiant', magnitude: 1.09, distance: 554, temperature: 3660, mass: 12, radius: 680, luminosity: 75900, ra: '16h 29m 24.5s', dec: '-26° 25\' 55"' },
];

export default function App() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [objectData, setObjectData] = useState<DataVALC | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadObjectData = async (objectName: string) => {
        setIsLoading(true);
        setError(null);
        setObjectData(null);

        try {
            const data = await getVALCData(objectName);
            console.log('VALC data loaded:', data);
            setObjectData(data);
        } catch (err) {
            console.error('Error loading VALC data:', err);
            setError(err instanceof Error ? err.message : 'Failed to load object data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (objectName: string) => {
        // Update URL with object parameter
        const url = new URL(window.location.href);
        url.searchParams.set('object', objectName);
        window.history.pushState({}, '', url.toString());

        await loadObjectData(objectName);
    };

    // Load object from URL on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const objectParam = urlParams.get('object');

        if (objectParam) {
            loadObjectData(objectParam);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header
                onSearch={handleSearch}
                onAboutClick={() => setIsAboutOpen(true)}
                onAdvancedSearchClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                isLoading={isLoading}
            />

            {isAdvancedSearchOpen && (
                <AdvancedSearch
                    objects={starObjects}
                    onSelectObject={(object) => handleSearch(object.name)}
                />
            )}

            <main className="container mx-auto px-6 py-8">
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {objectData && (
                    <div className="mb-8">
                        <h1 className="text-slate-900 mb-2">{objectData.name}</h1>
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Loading data...</p>
                    </div>
                ) : objectData ? (
                    <div className="grid grid-cols-[400px_1fr] gap-6">
                        <div>
                            <h2 className="text-slate-900 mb-4">ZTF/DR7/color</h2>
                            <Aladin object={objectData} />

                            <h2 className="text-slate-900 mb-4 mt-6">Object Parameters</h2>
                            <ObjectParameters object={objectData} />
                        </div>

                        <div>
                            <div>
                                <ObjectCharts object={objectData} />
                            </div>
                            <div className="mt-6">
                                <ObjectImages object={objectData} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Enter object name in the search field to load data</p>
                    </div>
                )}
            </main>

            <AboutDialog open={isAboutOpen} onOpenChange={setIsAboutOpen} />
        </div>
    );
}

