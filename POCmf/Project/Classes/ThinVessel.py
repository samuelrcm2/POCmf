from Project.Classes.MotorChain import MotorChain

class ThinVessel(MotorChain):
    def calculateCircumferentialStress (self):
        self.circumferentialStress  = \
            (self.workPressure * self.internalRadius) / self.thickness

    def calculateHeatCircumferentialStress (self, material):
        E = material.elasticityModule
        a = material.thermalExpansioCoeficient
        v = material.poissonRatio
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
        E = material.elasticityModule
        a = material.thermalExpansioCoeficient
        v = material.poissonRatio
        dT = self.additionalHeatStress.temperatureVariation
        self.additionalHeatStress.circumferentialStress = (E*a*dT)/(2*(1-v))

    def calculateCircumferentialStress (self):
        self.circumferentialStress  = \
            (self.workPressure * self.internalRadius) / self.thickness

    def calculateMaxRadialStress (self):
        self.radialStress = 0

    def calculateLongitudinalStress (self):
        self.longitudinalStress = \
            (self.workPressure * self.internalRadius) / (2 * self.thickness)

    def calculateThickness (self):
        thicknessByFirstMethod = \
            (self.workPressure * self.internalRadius) / self.circumferentialStress
        thicknessBySecondMethod = \
            (self.workPressure * self.internalRadius) / (2 * self.longitudinalStress)

        self.thickness = thicknessByFirstMethod if \
            thicknessByFirstMethod < thicknessBySecondMethod \
            else thicknessBySecondMethod
            
    
    def calculateAdditionHeatStress (self):
        material = \
            MaterialsDomain.Materials.getMaterialById(self.materialId)
        self.calculateHeatMaxRadialStress(material)
        self.calculateLongitudinalStress(material)
        self.calculateHeatCircumferentialStress(material)

    def calculateSM (self): #MODIFICAR
        arrayOfStresses = [self.longitudinalStress, self.circumferentialStress, self.radialStress]
        self.SM = self.admissiveStress / max(arrayOfStresses)
        
    def calculatePrincipalStresses (self):
        self.calculateCircumferentialStress()
        self.calculateLongitudinalStress()
        self.calculateMaxRadialStress()
        if self.hasAditionalHeatStress:
            self.calculateAdditionHeatStress()

    @classmethod
    def motorChainSMCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        newMotorChain.calculatePrincipalStresses()
        newMotorChain.calculateAdmissiveStress()
        newMotorChain.calculateSM()
        return newMotorChain
    

    @classmethod
    def motorChainThicknessCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        newMotorChain.calculateThickness()
        return newMotorChain
    

    @classmethod
    def motorChainStressesCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        newMotorChain.calculatePrincipalStresses()
        return newMotorChain