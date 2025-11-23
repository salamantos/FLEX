import { HOST } from '../config';
import { DataVALC } from '../types/api';

/**
 * Fetches VALC data for a given object name
 * @param name - The name of the object
 * @returns Promise resolving to DataVALC or null if not found
 * @throws Error if the request fails
 */
export async function getVALCData(name: string): Promise<DataVALC> {
    const response = await fetch(`${HOST}/data/VALC/${name}`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Data not found for object: ${name}`);
        }
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: DataVALC = await response.json();
    return data;
}

