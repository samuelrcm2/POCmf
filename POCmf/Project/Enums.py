from enum import IntEnum, unique


@unique
class CalculationType(IntEnum):
    SAFETY_MARGIN = 0
    THICKNESS = 1
    MAIN_STRESSES = 2