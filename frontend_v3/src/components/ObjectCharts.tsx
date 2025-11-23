import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { DataVALC } from '../types/api';

interface ObjectChartsProps {
    object: DataVALC;
}

export function ObjectCharts({ object }: ObjectChartsProps) {
    const { atlasData: atlasData, atlasLayout, ztfData: ztfData, ztfLayout } = useMemo(() => {
        const data = object.plot;

        if (!data || data === null) {
            return {
                atlasData: [],
                atlasLayout: {},
                ztfData: [],
                ztfLayout: {},
            };
        }

        // ATLAS traces
        const trace_c_after = {
            x: data.MJD_after_c || [],
            y: data.flux_after_c || [],
            error_y: {
                type: 'data' as const,
                array: data.flux_err_after_c || [],
                visible: true,
            },
            marker: {
                color: "rgba(0,0,255,0.3)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'c after',
        };

        const trace_o_after = {
            x: data.MJD_after_o || [],
            y: data.flux_after_o || [],
            error_y: {
                type: 'data' as const,
                array: data.flux_err_after_o || [],
                visible: true,
            },
            marker: {
                color: "rgba(255,165,0,0.3)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'o after',
        };

        const trace_c_before = {
            x: data.MJD_before_c || [],
            y: data.flux_before_c || [],
            error_y: {
                type: 'data' as const,
                array: data.flux_err_before_c || [],
                visible: true,
            },
            marker: {
                color: "rgba(30, 30, 155,0.3)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'c before',
        };

        const trace_o_before = {
            x: data.MJD_before_o || [],
            y: data.flux_before_o || [],
            error_y: {
                type: 'data' as const,
                array: data.flux_err_before_o || [],
                visible: true,
            },
            marker: {
                color: "rgba(255,125,50,0.3)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'o before',
        };

        // ZTF traces
        const trace_g_after = {
            x: data.MJD_after_g || [],
            y: data.flux_after_g || [],
            xaxis: 'x2' as const,
            yaxis: 'y2' as const,
            error_y: {
                type: 'data' as const,
                array: data.flux_err_after_g || [],
                visible: true,
            },
            marker: {
                color: "rgba(39, 174, 96, 0.5)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'g after',
        };

        const trace_i_after = {
            x: data.MJD_after_i || [],
            y: data.flux_after_i || [],
            xaxis: 'x2' as const,
            yaxis: 'y2' as const,
            error_y: {
                type: 'data' as const,
                array: data.flux_err_after_i || [],
                visible: true,
            },
            marker: {
                color: "rgba(236, 90, 250, 0.5)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'i after',
        };

        const trace_r_after = {
            x: data.MJD_after_r || [],
            y: data.flux_after_r || [],
            xaxis: 'x2' as const,
            yaxis: 'y2' as const,
            error_y: {
                type: 'data' as const,
                array: data.flux_err_after_r || [],
                visible: true,
            },
            marker: {
                color: "rgba(236, 112, 99, 0.5)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'r after',
        };

        const trace_g_before = {
            x: data.MJD_before_g || [],
            y: data.flux_before_g || [],
            xaxis: 'x2' as const,
            yaxis: 'y2' as const,
            error_y: {
                type: 'data' as const,
                array: data.flux_err_before_g || [],
                visible: true,
            },
            marker: {
                color: "rgba(39, 130, 96, 0.5)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'g before',
        };

        const trace_i_before = {
            x: data.MJD_before_i || [],
            y: data.flux_before_i || [],
            xaxis: 'x2' as const,
            yaxis: 'y2' as const,
            error_y: {
                type: 'data' as const,
                array: data.flux_err_before_i || [],
                visible: true,
            },
            marker: {
                color: "rgba(230, 60, 170, 0.5)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'i before',
        };

        const trace_r_before = {
            x: data.MJD_before_r || [],
            y: data.flux_before_r || [],
            xaxis: 'x2' as const,
            yaxis: 'y2' as const,
            error_y: {
                type: 'data' as const,
                array: data.flux_err_before_r || [],
                visible: true,
            },
            marker: {
                color: "rgba(230, 60, 90, 0.5)",
                size: 5,
            },
            mode: 'markers' as const,
            type: 'scatter' as const,
            name: 'r before',
        };

        const atlasData = [trace_c_after, trace_o_after, trace_c_before, trace_o_before];
        const atlasLayout: any = {
            grid: { rows: 1, columns: 1, pattern: 'independent' },
            margin: {
                t: 50,
                b: 60,
                l: 70,
                r: 20,
            },
            xaxis: {
                title: {
                    text: 'MJD',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 16,
                        color: '#475569',
                    },
                },
            },
            yaxis: {
                title: {
                    text: 'Flux [mJy]',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 16,
                        color: '#475569',
                    },
                },
            },
            annotations: [
                {
                    text: "ATLAS",
                    font: {
                        family: 'Inter, sans-serif',
                        size: 20,
                        color: '#1e293b',
                    },
                    showarrow: false,
                    align: 'center' as const,
                    x: 0.5,
                    y: 1.1,
                    xref: 'paper' as const,
                    yref: 'paper' as const,
                },
            ],
        };

        const ztfData = [
            trace_g_after,
            trace_r_after,
            trace_i_after,
            trace_g_before,
            trace_r_before,
            trace_i_before,
        ];
        const ztfLayout: any = {
            grid: { rows: 1, columns: 1, pattern: 'independent' },
            margin: {
                t: 50,
                b: 60,
                l: 70,
                r: 20,
            },
            xaxis: {
                title: {
                    text: 'MJD',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 16,
                        color: '#475569',
                    },
                },
            },
            yaxis2: {
                title: {
                    text: 'Magnitude',
                    font: {
                        family: 'Inter, sans-serif',
                        size: 16,
                        color: '#475569',
                    },
                },
                autorange: 'reversed',
            },
            annotations: [
                {
                    text: "ZTF",
                    font: {
                        family: 'Inter, sans-serif',
                        size: 20,
                        color: '#1e293b',
                    },
                    showarrow: false,
                    align: 'center' as const,
                    x: 0.5,
                    y: 1.1,
                    xref: 'paper' as const,
                    yref: 'paper' as const,
                },
            ],
        };

        return {
            atlasData: atlasData,
            atlasLayout: atlasLayout,
            ztfData: ztfData,
            ztfLayout: ztfLayout,
        };
    }, [object.plot]);

    if (!object.plot || object.plot === null) {
        return (
            <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-sm">
                <p className="text-slate-500">No plot data available</p>
            </div>
        );
    }

    return <>
        <h2 className="text-slate-900 mb-4">Forced Photometry light curves</h2>

        <div className="grid grid-cols-1 gap-6">

            {/* ATLAS Light Curve */}
            <div className="bg-white border border-slate-300 rounded-lg p-2 shadow-sm">
                <div style={{ width: '100%', height: '410px' }}>
                    <Plot
                        data={atlasData}
                        layout={{
                            ...atlasLayout,
                            autosize: true,
                        } as any}
                        config={{ scrollZoom: true, responsive: true }}
                        style={{ width: '100%', height: '100%' }}
                        useResizeHandler={true}
                    />
                </div>
            </div>

            {/* ZTF Light Curve */}
            <div className="bg-white border border-slate-300 rounded-lg p-2 shadow-sm">
                <div style={{ width: '100%', height: '410px' }}>
                    <Plot
                        data={ztfData}
                        layout={{
                            ...ztfLayout,
                            autosize: true,
                        } as any}
                        config={{ scrollZoom: true, responsive: true }}
                        style={{ width: '100%', height: '100%' }}
                        useResizeHandler={true}
                    />
                </div>
            </div>
        </div>
    </>
}
