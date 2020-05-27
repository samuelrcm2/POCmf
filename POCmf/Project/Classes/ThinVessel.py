from Project.Classes.MotorChain import MotorChain

class ThinVessel(MotorChain):
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
            

    def calculateSM (self):
            arrayOfStresses = [self.longitudinalStress, self.circumferentialStress, self.radialStress]
            self.SM = self.admissiveStress / max(arrayOfStresses)
        
    def calculatePrincipalStresses (self):
        self.calculateCircumferentialStress()
        self.calculateLongitudinalStress()
        self.calculateMaxRadialStress()

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