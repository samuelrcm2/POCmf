from Project.Classes.MotorChain import MotorChain
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

    def calculateHeatCircumferentialStress (self, material):
        E = material['elasticityModule']
        a = material['thermalExpansioCoeficient']
        v = material['poissonRatio']
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

    def calculateHeatMaxRadialStress (self, material):
        self.additionalHeatStress.radialStress = 0


    def calculateLongitudinalStress (self):
        p = self.workPressure
        ri = self.internalRadius
        re = self.internalRadius + self.thickness
        self.longitudinalStress = (p * ri ** 2)/((re ** 2)- (ri ** 2))

    def calculateHeatLongitudinalStress (self, material):
        E = material['elasticityModule']
        a = material['thermalExpansioCoeficient']
        v = material['poissonRatio']
        ri = self.internalRadius
        re = ri + self.thickness
        dT = self.additionalHeatStress.temperatureVariation
        self.additionalHeatStress.longitudinalStress = (E*a*dT)/(2*(1-v))  \
            * ((2*(re/ri) ** 2)/(-1 + (re/ri) ** 2) - (1/math.log(re/ri)))

    def calculateThickness (self, initialThicknessValue):
        #Using Newton's Method
        externalRadius = optimize.newton(self.calculateMaxCircunferentialStressByExternalRadius, (initialThicknessValue + self.internalRadius))
        self.thickness = externalRadius - self.internalRadius

    def calculatePrincipalStresses (self):
        self.calculateCircumferentialStress()
        self.calculateLongitudinalStress()
        self.calculateMaxRadialStress()
        self.calculateNozzleReinforcementThickness()
        if self.hasAditionalHeatStress:
            self.calculateAdditionHeatStress()

        self.calculateVonMisesStress()
    
    def calculateMaxCircunferentialStressByExternalRadius(self, externalRadius):
        return (self.workPressure * ((self.internalRadius ** 2 + externalRadius ** 2) / (externalRadius ** 2 - self.internalRadius ** 2 )) ) - self.circumferentialStress

    @classmethod
    def motorChainSMCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        newMotorChain.calculatePrincipalStresses()
        newMotorChain.calculateSM()
        return newMotorChain
    

    @classmethod
    def motorChainThicknessCalculation(cls, motorChain, initialThicknessValue):
        newMotorChain = cls(motorChain)
        newMotorChain.calculateThickness(initialThicknessValue)
        return newMotorChain