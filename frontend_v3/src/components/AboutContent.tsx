interface AboutContentProps {
    variant?: 'dark' | 'light';
}

export function AboutContent({ variant = 'dark' }: AboutContentProps) {
    const isLight = variant === 'light';
    
    return (
        <div className={`space-y-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <div className="flex items-center gap-3 mb-4">
                <img 
                    src="/logo.svg" 
                    alt="VALC logo" 
                    className="w-12 h-12"
                />
                <h2 className={`text-xl font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>VALC</h2>
            </div>
            
            <p>
                VALC (Variability Analyzer for Light Curves) is Python package, which is devoted to post-processing of
                ZTF Forced Photometry light curves and conducting statistical test to
                reject the hypothesis of a constant with white noise.
            </p>
            <p>
                The purpose of the work is in
                confirmation of the presence of active galactic nuclei (AGN) type-1 in the host galaxies of
                candidates. Tests of the algorithm was provided on a sample of AGN, powered by
                intermediate mass black holes (IMBH; M &lt; 2×10⁵ M☉) and low-weighted supermassive
                black holes (LWSMBH; M &lt; 2×10⁶ M☉).
                Post-processing includes outlier filtering, color correction
                and zero-point correction.
            </p>
            <p>
                The key advantage of the algorithm is the subtraction magnitude
                of the median comparison star, which is extracted from 50 nearest
                non-variable stars. [1,2].
            </p>

            <div className="space-y-2">
                <p>
                    Algorithm implementation: <a
                        href="https://github.com/masha-astro/optical_variability_ztf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={isLight ? "text-blue-600 hover:text-blue-700 underline" : "text-blue-400 hover:text-blue-300 underline"}
                    >
                        https://github.com/masha-astro/optical_variability_ztf
                    </a>
                </p>
                <p>
                    Web interface implementation: <a
                        href="https://github.com/salamantos/FLEX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={isLight ? "text-blue-600 hover:text-blue-700 underline" : "text-blue-400 hover:text-blue-300 underline"}
                    >
                        https://github.com/salamantos/FLEX
                    </a>
                </p>
                <p>
                    <i>
                        [1] Demianenko M. et al., "Optical Variability of "Light-weight"
                        Supermassive Black Holes at a Few Percent Level from ZTF Forced-Photometry Light
                        Curves", Proceedings of ADASS-2021 conference, 2022,{' '}
                        <a
                            href="https://arxiv.org/abs/2201.03712"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={isLight ? "text-blue-600 hover:text-blue-700 underline" : "text-blue-400 hover:text-blue-300 underline"}
                        >
                            https://arxiv.org/abs/2201.03712
                        </a>
                    </i>
                </p>
                <p>
                    <i>
                        [2] Demianenko M. et al., "Optical light curves of light-weight
                        supermassive black holes produced by the Zwicky Transient
                        Facility Forced Photometry Service", Proceedings of VAK-2021
                        conference, 2021,{' '}
                        <a
                            href="https://arxiv.org/abs/2112.11520"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={isLight ? "text-blue-600 hover:text-blue-700 underline" : "text-blue-400 hover:text-blue-300 underline"}
                        >
                            https://arxiv.org/abs/2112.11520
                        </a>
                    </i>
                </p>
            </div>

            <div>
                <h3 className={`mb-3 font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Parameters:</h3>
                <div className={`border rounded-lg overflow-hidden ${isLight ? 'border-slate-300' : 'border-slate-700'}`}>
                    <div className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-700'}`}>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-3 ${isLight ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>Name</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>name of the object</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>Statistics</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>comments about X-ray data lowmass_allxray_1908.fits</div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-3 ${isLight ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>ra, dec</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>object coordinates</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>redshift</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>redshift from lowmass_allxray_2812.fits</div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-3 ${isLight ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>MBH_SDSS</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>Black Hole Mass from 'lowmass_allxray_2812.fits' in M☉</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>MBH_MagE</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>Black Hole Mass from '/data1/IMBH/MagE/results_emis_fit2d.fits' in M☉</div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-3 ${isLight ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>MBH_ESI</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>Black Hole Mass from '/data1/IMBH/ESI/results_emis_fit2d.fits' in M☉</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>MBH_SALT</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>Black Hole Mass from '/data1/IMBH/SALT/results_emis_fit2d.fits' in M☉</div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-3 ${isLight ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>L_X; NH; Gamma</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>luminosity and parameters of the X-ray data</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>source</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>source of the X-ray data</div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-3 ${isLight ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>rcsed</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>search in rcsed2</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>page_all_fit</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>page with all files of 2D spectra fit</div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-3 ${isLight ? 'bg-slate-50' : 'bg-slate-800/50'}`}>
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>page.html</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>page with X-ray data</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                            <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>Table from</div>
                            <div className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                                table from which the information is taken:<br />
                                lowmass_allxray_2812.fits;<br />
                                results_emis_fit2d_ESI.fits;<br />
                                results_emis_fit2d_MagE.fits
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

