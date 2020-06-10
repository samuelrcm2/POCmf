from Project.Classes.Screw import Screw
import math

class HeadChain :
    def __init__(self, headChain):
        self.topThickness: float = headChain["topThickness"]
        self.sideThickness: float = headChain["sideThickness"]
        self.scrwPattern: Screw = {}
        self.screwHeight: float = headChain["screwHeight"]
        self.headHeight: float = headChain["headHeight"]
        self.workPressure: float = headChain["workPressure"]
        self.internalRadius: float = headChain["internalRadius"]
        self.maxForce: float = None

    def calculateMaxForce(self):
        self.maxForce = math.pi * (self.internalRadius ** 2) * self.workPressure

    


