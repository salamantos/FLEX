import { useEffect, useRef } from 'react';
import { DataVALC } from '../types/api';

// Declare global Aladin type
declare global {
    interface Window {
        A: {
            aladin: (
                selector: string,
                options: {
                    survey: string;
                    fov: number;
                    target: string;
                }
            ) => any;
        };
    }
}

interface AladinProps {
    object: DataVALC;
}

export function Aladin({ object }: AladinProps) {
    const aladinRef = useRef<HTMLDivElement>(null);
    const aladinInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!aladinRef.current) {
            return;
        }

        const ra = object.params?.ra;
        const dec = object.params?.dec;

        if (!ra || !dec) {
            return;
        }

        // Wait for Aladin script to load
        const initAladin = () => {
            if (!window.A || !aladinRef.current) {
                return;
            }

            const coords = `${Number(ra)} ${Number(dec)}`;
            const aladinDivId = 'aladin-lite-div';

            // Set ID for the div
            aladinRef.current.id = aladinDivId;

            // Clear previous instance if exists
            if (aladinInstanceRef.current) {
                aladinRef.current.innerHTML = '';
            }

            // Initialize Aladin
            aladinInstanceRef.current = window.A.aladin(
                `#${aladinDivId}`,
                {
                    survey: "CDS/P/ZTF/DR7/color",
                    fov: 0.1,
                    target: coords
                }
            );
        };

        // Check if Aladin is already loaded
        if (window.A) {
            initAladin();
        } else {
            // Wait for script to load
            const checkInterval = setInterval(() => {
                if (window.A) {
                    clearInterval(checkInterval);
                    initAladin();
                }
            }, 100);

            // Cleanup interval after 5 seconds
            setTimeout(() => clearInterval(checkInterval), 5000);
        }
    }, [object.params?.ra, object.params?.dec]);

    return (
        <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
            <div
                ref={aladinRef}
                className="w-full"
                style={{ aspectRatio: '1 / 1' }}
            />
        </div>
    );
}

