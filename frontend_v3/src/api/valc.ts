import { HOST } from '../config';
import { DataVALC } from '../types/api';

/**
 * Fetches VALC data for a given object name
 * @param name - The name of the object
 * @returns Promise resolving to DataVALC or null if not found
 * @throws Error if the request fails
 */
export async function getVALCData(name: string): Promise<DataVALC> {
    const response = await fetch(`${HOST}/data/VALC/${name}/`);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Data not found for object: ${name}`);
        }
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: DataVALC = await response.json();
    return data;
}

/**
 * Fetches list of all VALC object names
 * @returns Promise resolving to array of object names
 * @throws Error if the request fails
 */
export async function getVALCObjectNames(): Promise<string[]> {
    const response = await fetch(`${HOST}/names-valc/`);

    if (!response.ok) {
        throw new Error(`Failed to fetch object names: ${response.statusText}`);
    }

    const data: string[] = await response.json();
    return data;
}

/**
 * Searches for objects by name
 * @param type - Type of objects to search (e.g., 'VALC', 'FULU')
 * @param query - Search query string
 * @returns Promise resolving to array of matching object names
 * @throws Error if the request fails
 */
export async function searchObjects(type: string, query: string): Promise<string[]> {
    const response = await fetch(`${HOST}/search?type=${encodeURIComponent(type)}&query=${encodeURIComponent(query)}`);

    if (!response.ok) {
        throw new Error(`Failed to search objects: ${response.statusText}`);
    }

    const data: string[] = await response.json();
    return data;
}

