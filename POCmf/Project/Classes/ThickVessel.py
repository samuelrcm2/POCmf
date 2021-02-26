from Project.Classes.MotorChain import MotorChain
from Project.Domain import MaterialsDomain
import math
from scipy import optimize

ACCEPTABLE_ERROR = 0.0001

class ThickVessel (MotorChain):
    def calculateCircumferentialStress (self):
        p = self.workPressure
        ri = self.internalRadius
        re = self.internalRadius + self.thickness
        self.circumferentialStress = p * ((ri ** 2) / (re ** 2 - ri ** 2 )) \
            * (1 + (re ** 2)/(ri ** 2))

    def calculateHeatCircumferentialStress (self):
        E = self.material['elasticityModule']
        a = self.material['thermalExpansioCoeficient']
        v = self.material['poissonRatio']
        ri = self.internalRadius
        re = ri + self.thickness
        dT = self.additionalHeatStress.temperatureVariation
        self.additionalHeatStress.circumferentialStress = (E*a*dT)/(2*(1-v))  \
            * ((2*(re/ri) ** 2)/(-1 + (re/ri) ** 2) - (1/math.log(re/ri)))

    def calculateMaxRadialStress (self):
        p = self.workPressure
        ri = self.internalRadius
        re = self.internalRadius + self.thickness
        self.radialStress = p * ((ri ** 2) / (re ** 2 - ri ** 2 )) \
            * (1 - (re ** 2)/(ri ** 2))

    def calculateHeatMaxRadialStress (self):
        self.additionalHeatStress.radialStress = 0


    def calculateLongitudinalStress (self):
        p = self.workPressure
        ri = self.internalRadius
        re = self.internalRadius + self.thickness
        self.longitudinalStress = (p * ri ** 2)/((re ** 2)- (ri ** 2))

    def calculateHeatLongitudinalStress (self):
        E = self.material['elasticityModule']
        a = self.material['thermalExpansioCoeficient']
        v = self.material['poissonRatio']
        ri = self.internalRadius
        re = ri + self.thickness
        dT = self.additionalHeatStress.temperatureVariation
        self.additionalHeatStress.longitudinalStress = (E*a*dT)/(2*(1-v))  \
            * ((2*(re/ri) ** 2)/(-1 + (re/ri) ** 2) - (1/math.log(re/ri)))

    def calculateThickness (self):
        radiusRatio = optimize.newton(self.calculateVonMissesByRadiusRatio,1.1)
        self.thickness = (radiusRatio * self.internalRadius) - self.internalRadius

    def calculateThicknessWithHeatAddition (self):
        radiusRatio = optimize.newton(self.calculateVonMissesByRadiusRatioWithHeatAddition, 1.1)
        self.thickness = (radiusRatio * self.internalRadius) - self.internalRadius

    def calculatePrincipalStresses (self):
        self.calculateCircumferentialStress()
        self.calculateLongitudinalStress()
        self.calculateMaxRadialStress()
        self.calculateNozzleReinforcementThickness()
        if self.hasAditionalHeatStress:
            self.calculateAdditionHeatStress()
        self.calculateVonMisesStress()
    
    def calculateVonMissesByRadiusRatio(self, x):
        p = self.workPressure 
        sigma_e = self.material['yeldStrength']/1.5
        return ((math.sqrt(3) * p * (x**2))/((x**2) -1)) - sigma_e

    def calculateVonMissesByRadiusRatioWithHeatAddition(self, x):
        p = self.workPressure 
        sigma_e = self.material['yeldStrength']/1.5
        S = self.getThermicalS()
        f1 = ((x**4)*(3*p**2 + 6*p*S + 4*S**2))/((x**2 -1)**2)
        f2 = (S*(x**2)*(4*S + 3*p))/((x**2 -1)*math.log(x))
        f3 = (S**2)/(math.log(x)**2)
        return math.sqrt(f1 - f2 + f3) - sigma_e


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