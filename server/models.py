import dataclasses
from typing import List


@dataclasses.dataclass
class Data:
    name: str
    time_with_error: List[float]
    time: List[float]
    flux_0_with_error: List[float]
    flux_1_with_error: List[float]
    flux_0: List[float]
    flux_1: List[float]
