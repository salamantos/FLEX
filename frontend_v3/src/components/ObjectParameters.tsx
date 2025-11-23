import React from 'react';
import { DataVALC } from '../types/api';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from './ui/table';

interface ObjectParametersProps {
    object: DataVALC;
}

// Rounding to exponential form of number
function expo(x: number, f: number): string {
    return Number.parseFloat(String(x)).toExponential(f);
}

function round(x: number, f: number): string {
    return Number.parseFloat(String(x)).toFixed(f);
}

function showExp(obj: any): string {
    if (Array.isArray(obj)) {
        return obj.map(x => expo(x, 2)).join(', ');
    }
    if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).map(x => expo(x as number, 2)).join(', ');
    }
    return expo(obj, 2);
}

function showFix(obj: any): string {
    if (Array.isArray(obj)) {
        return obj.map(x => round(x, 2)).join(', ');
    }
    if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).map(x => round(x as number, 2)).join(', ');
    }
    return round(obj, 2);
}

function isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    return false;
}

export function ObjectParameters({ object }: ObjectParametersProps) {
    const params = object.params || {};

    // Filter out empty values and create parameter rows
    const parameters: Array<{ name: string; value: React.ReactNode }> = [];

    for (const [param, value] of Object.entries(params)) {
        if (isEmpty(value)) continue;

        let colValue: React.ReactNode;

        // Parameters that should be displayed as lists
        if (param === 'Statistics' || param === 'source' || param === 'MBH_SDSS' ||
            param === 'MBH_ESI' || param === 'MBH_MagE' || param === 'MBH_SALT') {
            const values = Array.isArray(value) ? value : Object.values(value);
            colValue = (
                <div className="flex flex-col">
                    {values.map((stat: any, idx: number) => (
                        <div key={idx}>{String(stat)}</div>
                    ))}
                </div>
            );
        }
        // Parameters that should be displayed as links
        else if (param === 'rcsed') {
            colValue = (
                <a href={String(value)} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    rcsed link
                </a>
            );
        }
        else if (param === 'page.html' || param === 'page_all_fit') {
            colValue = (
                <a href={String(value)} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {String(value)}
                </a>
            );
        }
        // Parameters that should be displayed in exponential form
        else if (param === 'L_X' || param === 'NH') {
            colValue = <span>{showExp(value)}</span>;
        }
        // Parameters that should be rounded to fixed number
        else if (param === 'Gamma' || param === 'redshift') {
            colValue = <span>{showFix(value)}</span>;
        }
        // Default: display as string
        else {
            colValue = <span>{String(value)}</span>;
        }

        parameters.push({ name: param, value: colValue });
    }

    // Add IAU Name as the first parameter
    const allParameters = [
        { name: 'IAU Name', value: <span>{object.name}</span> },
        ...parameters
    ];

    return (
        <div className="bg-white border border-slate-300 rounded-lg overflow-hidden shadow-sm">
            <Table>
                <TableBody>
                    {allParameters.map((param, index) => (
                        <TableRow
                            key={index}
                            className="border-slate-200"
                        >
                            <TableCell className="text-slate-700 bg-slate-50">{param.name}</TableCell>
                            <TableCell className="text-slate-900">{param.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

