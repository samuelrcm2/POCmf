from Project.Classes.Screw import Screw
from Project.Classes.Material import Materials
from Project.Classes.ProjectHandler import ProjectHandler
import math

class HeadChain(ProjectHandler) :
    def __init__(self, headChain):
        self.screwPattern: Screw = Screw(headChain["screwPattern"]["id"],headChain["screwPattern"]["name"],headChain["screwPattern"]["pitch"],headChain["screwPattern"]["minMinorDiameter"],headChain["screwPattern"]["maxMinorDiameter"],headChain["screwPattern"]["minMajorDiameter"],headChain["screwPattern"]["maxMajorDiameter"])
        self.screwHeight: float = headChain["screwHeight"]
        self.internalHeadHeight: float = headChain["internalHeadHeight"]
        self.externalHeadHeight: float = headChain["externalHeadHeight"]
        self.workPressure: float = headChain["workPressure"]
        self.internalRadius: float = headChain["internalRadius"]
        self.thickness: float = headChain["thickness"]
        self.materialId: float = headChain["materialId"]
        self.yeldStrength: float = None
        self.maxForce: float = None
        self.cogHeight: float = None
        self.maxPressureSupported: float = None
        self.selectPrimitiveDiameter: float = None
        self.selectedMajorDiameter: float = None
        self.selectedMinorDiameter: float = None

    def calculateCogHeight(self, pitch):
        self.cogHeight = math.sqrt(3) * pitch / 2

    def calculatePrimitiveDiameter(self):
        self.selectPrimitiveDiameter = self.selectedMajorDiameter - 0.75 * self.cogHeight

    def calculateMaxPressureSupported(self):
        self.maxPressureSupported = (1.25 * self.cogHeight * self.selectPrimitiveDiameter * self.yeldStrength)/(0.38 * self.selectedMajorDiameter ** 2)

    def calculateMaxForce(self):
        self.maxForce = math.pi * (self.internalRadius ** 2) * self.workPressure

    def defineDiametersByMinimumDiameter(self, minimumDiameter):
        self.selectedMinorDiameter = minimumDiameter if minimumDiameter > self.internalRadius and \
            minimumDiameter > self.screwPattern.minMinorDiameter else self.screwPattern.minMinorDiameter
        self.selectedMajorDiameter = self.selectedMinorDiameter + 0.69717 * self.cogHeight
        if (not self.defineIfScrewPatternIsPossible()):
            raise Exception("The thickness defined cannot be used to the pitch choosed. PLease define a thicker veise or e smaller pitch.")

    def defineIfScrewPatternIsPossible(self):
        if (self.selectedMajorDiameter > ((self.internalRadius + self.thickness)*2)):
            return False
        if (self.cogHeight > self.thickness): 
            return False
        return True

    def getYeldStrength(self):
        self.yeldStrength = Materials.getMaterialById(self.materialId)['yeldStrength']

    @classmethod
    def defineScrewBySelectedScrew(cls, headChain):
        newHeadChain = cls(headChain)
        newHeadChain.getYeldStrength()
        newHeadChain.calculateCogHeight(newHeadChain.screwPattern.pitch)
        newHeadChain.defineDiametersByMinimumDiameter(newHeadChain.internalRadius * 2)
        newHeadChain.calculatePrimitiveDiameter()
        newHeadChain.calculateMaxPressureSupported()
        return newHeadChain.maxPressureSupported

    def defineIfScrewProjectIsCorrect(self):
        pass

    def serialize(self):
        return {
            "screwPattern": self.screwPattern.serialize(),
            "screwHeight": self.screwHeight,
            "internalHeadHeight": self.internalHeadHeight,
            "externalHeadHeight": self.externalHeadHeight,
            "workPressure": self.workPressure,
            "internalRadius": self.internalRadius,
            "thickness": self.thickness,
            "yeldStrength": self.yeldStrength,
            "maxForce": self.maxForce,
            "cogHeight": self.cogHeight,
            "maxPressureSupported": self.maxPressureSupported,
            "selectPrimitiveDiameter": self.selectPrimitiveDiameter,
            "selectedMajorDiameter": self.selectedMajorDiameter,
            "selectedMinorDiameter": self.selectedMinorDiameter
        }


