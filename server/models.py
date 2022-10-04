import dataclasses
from typing import List, Optional


@dataclasses.dataclass
class Data:
    name: str
    
    time: List[float]
    time_error: List[float]
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

    type: str = 'FULU'


@dataclasses.dataclass
class DataVALC:
    name: str

    params: dict
    images: Optional[List[str]]

    type: str = 'VALC'
