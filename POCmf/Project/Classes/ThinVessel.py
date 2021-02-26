from Project.Classes.MotorChain import MotorChain
from Project.Domain import MaterialsDomain
import math
from scipy import optimize

class ThinVessel(MotorChain):
    def calculateCircumferentialStress (self):
        self.circumferentialStress  = \
            (self.workPressure * self.internalRadius) / self.thickness

    def calculateHeatCircumferentialStress (self):
        self.additionalHeatStress.circumferentialStress = self.getThermicalS()

    def calculateMaxRadialStress (self):
        self.radialStress = 0

    def calculateHeatMaxRadialStress (self):
        self.additionalHeatStress.radialStress = 0

    def calculateLongitudinalStress (self):
        self.longitudinalStress = \
            (self.workPressure * self.internalRadius) / (2 * self.thickness)

    def calculateHeatLongitudinalStress (self):
        self.additionalHeatStress.longitudinalStress = self.getThermicalS()

    def calculateThickness (self):
        p = self.workPressure
        r_i = self.internalRadius
        sigma_e = self.material['yeldStrength'] / 1.5
        self.thickness = math.sqrt(3)*p*r_i/ (2 *sigma_e)
        
    def calculateThicknessWithHeatAddition(self):
        self.thickness = optimize.newton(self.vonMissesWithHeatAdditionEquation, 0.0001)


    def vonMissesWithHeatAdditionEquation(self, thickness):
        p = self.workPressure
        r_i = self.internalRadius
        S = self.getThermicalS()
        sigma_e = self.material['yeldStrength'] / 1.5
        return math.sqrt(3*(p**2)*(r_i**2) + 6 * thickness*p*r_i*S + 4*(thickness**2)*(S**2))/(2 *thickness) - sigma_e

    def calculatePrincipalStresses (self):
        self.calculateCircumferentialStress()
        self.calculateLongitudinalStress()
        self.calculateMaxRadialStress()
        self.calculateNozzleReinforcementThickness()
        if self.hasAditionalHeatStress:
            self.calculateAdditionHeatStress()
        self.calculateVonMisesStress()

    @classmethod
    def motorChainSMCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        material = material = \
            MaterialsDomain.Materials.getMaterialById(newMotorChain.materialId)
        newMotorChain.material = material
        newMotorChain.calculatePrincipalStresses()
        newMotorChain.calculateSM()
        return newMotorChain
    

    @classmethod
    def motorChainThicknessCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        material = material = \
            MaterialsDomain.Materials.getMaterialById(newMotorChain.materialId)
        newMotorChain.material = material
        if newMotorChain.hasAditionalHeatStress:
            newMotorChain.calculateThicknessWithHeatAddition()
        else:
            newMotorChain.calculateThickness()
        return newMotorChain
