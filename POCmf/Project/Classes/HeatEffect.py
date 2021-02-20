

class HeatEffect():
    def __init__ (self, temperatureVariation):
        self.circumferentialStress: float = 0.0
        self.longitudinalStress: float = 0.0
        self.radialStress: float = 0.0
        self.temperatureVariation: float = temperatureVariation
