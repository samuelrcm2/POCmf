from Project.Classes.MotorChain import MotorChain

class ThinVessel(MotorChain):
    def calculateCircumferentialStress (self):
        self.circumferentialStress  = \
            (self.workPressure * self.internalRadius) / self.thickness

    def calculateHeatCircumferentialStress (self, material):
        E = material['elasticityModule']
        a = material['thermalExpansioCoeficient']
        v = material['poissonRatio']
        dT = self.additionalHeatStress.temperatureVariation
        self.additionalHeatStress.circumferentialStress = (E*a*dT)/(2*(1-v))

    def calculateMaxRadialStress (self):
        self.radialStress = 0

    def calculateHeatMaxRadialStress (self, material):
        self.additionalHeatStress.radialStress = 0

    def calculateLongitudinalStress (self):
        self.longitudinalStress = \
            (self.workPressure * self.internalRadius) / (2 * self.thickness)

    def calculateHeatLongitudinalStress (self, material):
        E = material['elasticityModule']
        a = material['thermalExpansioCoeficient']
        v = material['poissonRatio']
        dT = self.additionalHeatStress.temperatureVariation
        self.additionalHeatStress.longitudinalStress = (E*a*dT)/(2*(1-v))

    def calculateThickness (self):
        sigma_c = self.circumferentialStress + self.additionalHeatStress.circumferentialStress if self.hasAditionalHeatStress else self.circumferentialStress
        sigma_l = self.longitudinalStress + self.additionalHeatStress.longitudinalStress if self.hasAditionalHeatStress else self.longitudinalStress
        thicknessByMethods = [
            (self.workPressure * self.internalRadius) / sigma_c,
            (self.workPressure * self.internalRadius) / (2 * sigma_l)
        ]
        self.thickness = max(thicknessByMethods)
        
    def calculatePrincipalStresses (self):
        self.calculateCircumferentialStress()
        self.calculateLongitudinalStress()
        self.calculateMaxRadialStress()
        self.calculateVonMisesStress()
        self.calculateNozzleReinforcementThickness()
        if self.hasAditionalHeatStress:
            self.calculateAdditionHeatStress()

    @classmethod
    def motorChainSMCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        newMotorChain.calculatePrincipalStresses()
        newMotorChain.calculateSM()
        return newMotorChain
    

    @classmethod
    def motorChainThicknessCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        newMotorChain.calculateThickness()
        return newMotorChain
