import dataclasses
from typing import List


@dataclasses.dataclass
class Data:
    name: str
    x: List[float]
    y: List[float]
