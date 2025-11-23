import { DataVALC } from '../types/api';

interface ObjectImagesProps {
    object: DataVALC;
}

export function ObjectImages({ object }: ObjectImagesProps) {
    const images = object.images || [];

    if (images.length === 0) {
        return <></>;
    }

    return <>
        <h2 className="text-slate-900 mb-4">Spectral Analysis</h2>

        <div className="grid grid-cols-1 gap-6">
            {images.map((imageUrl, index) => (
                <div key={index} className="bg-white border border-slate-300 rounded-lg p-6 shadow-sm">
                    <div className="w-full">
                        <img
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            ))}
        </div>
    </>
}

