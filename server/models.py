import dataclasses
from typing import List, Optional, Dict


@dataclasses.dataclass
class Data:
    name: str
    
    time_0: List[float]
    time_1: List[float]
    #time_error: List[float]
    flux_0_error: List[float]
    flux_1_error: List[float]
    flux_0: List[float]
    flux_1: List[float]

    time_aug: List[float]
    time_error_aug: List[float]
    flux_0_error_aug: List[float]
    flux_1_error_aug: List[float]
    flux_0_aug: List[float]
    flux_1_aug: List[float]

    peaks_sum: Optional[float]
    peaks: Optional[Dict[str, float]]

    type: str = 'FULU'


@dataclasses.dataclass
class DataVALC:
    name: str

    params: Optional[dict] = None
    images: Optional[List[str]] = None
    plot: Optional[dict] = None
    image_cutout: Optional[str] = None

    type: str = 'VALC'
