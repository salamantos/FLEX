import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Star } from 'lucide-react';

interface AboutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-500"
                style={{ scrollbarColor: '#475569 #1e293b', scrollbarWidth: 'thin', maxWidth: '50rem' }}
            >
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Star className="w-7 h-7 text-white" />
                        </div>
                        <DialogTitle className="text-white">VALC</DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-300 space-y-4">
                        <p>
                            VALC is Python package, which is devoted to post-processing of
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
                                    className="text-blue-400 hover:text-blue-300 underline"
                                >
                                    https://github.com/masha-astro/optical_variability_ztf
                                </a>
                            </p>
                            <p>
                                Web interface implementation: <a
                                    href="https://github.com/salamantos/FLEX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline"
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
                                        className="text-blue-400 hover:text-blue-300 underline"
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
                                        className="text-blue-400 hover:text-blue-300 underline"
                                    >
                                        https://arxiv.org/abs/2112.11520
                                    </a>
                                </i>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white mb-3 font-semibold">Parameters:</h3>
                            <div className="border border-slate-700 rounded-lg overflow-hidden">
                                <div className="divide-y divide-slate-700">
                                    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50">
                                        <div className="font-semibold text-slate-200">Name</div>
                                        <div className="text-slate-300">name of the object</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3">
                                        <div className="font-semibold text-slate-200">Statistics</div>
                                        <div className="text-slate-300">comments about X-ray data lowmass_allxray_1908.fits</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50">
                                        <div className="font-semibold text-slate-200">ra, dec</div>
                                        <div className="text-slate-300">object coordinates</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3">
                                        <div className="font-semibold text-slate-200">redshift</div>
                                        <div className="text-slate-300">redshift from lowmass_allxray_2812.fits</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50">
                                        <div className="font-semibold text-slate-200">MBH_SDSS</div>
                                        <div className="text-slate-300">Black Hole Mass from 'lowmass_allxray_2812.fits' in M☉</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3">
                                        <div className="font-semibold text-slate-200">MBH_MagE</div>
                                        <div className="text-slate-300">Black Hole Mass from '/data1/IMBH/MagE/results_emis_fit2d.fits' in M☉</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50">
                                        <div className="font-semibold text-slate-200">MBH_ESI</div>
                                        <div className="text-slate-300">Black Hole Mass from '/data1/IMBH/ESI/results_emis_fit2d.fits' in M☉</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3">
                                        <div className="font-semibold text-slate-200">MBH_SALT</div>
                                        <div className="text-slate-300">Black Hole Mass from '/data1/IMBH/SALT/results_emis_fit2d.fits' in M☉</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50">
                                        <div className="font-semibold text-slate-200">L_X; NH; Gamma</div>
                                        <div className="text-slate-300">luminosity and parameters of the X-ray data</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3">
                                        <div className="font-semibold text-slate-200">source</div>
                                        <div className="text-slate-300">source of the X-ray data</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50">
                                        <div className="font-semibold text-slate-200">rcsed</div>
                                        <div className="text-slate-300">search in rcsed2</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3">
                                        <div className="font-semibold text-slate-200">page_all_fit</div>
                                        <div className="text-slate-300">page with all files of 2D spectra fit</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50">
                                        <div className="font-semibold text-slate-200">page.html</div>
                                        <div className="text-slate-300">page with X-ray data</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 p-3">
                                        <div className="font-semibold text-slate-200">Table from</div>
                                        <div className="text-slate-300">
                                            table from which the information is taken:<br />
                                            lowmass_allxray_2812.fits;<br />
                                            results_emis_fit2d_ESI.fits;<br />
                                            results_emis_fit2d_MagE.fits
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              © 2025 VALC. Educational and research purposes.
            </div> */}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

