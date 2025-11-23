// API types matching server/models.py

export interface DataVALC {
    name: string;
    params?: Record<string, any> | null;
    images?: string[] | null;
    plot?: Record<string, any> | null;
    image_cutout?: string | null;
    type: 'VALC';
}

