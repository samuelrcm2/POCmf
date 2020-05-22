from Project.Classes import MotorChain

class ThickVessel (MotorChain.MotorChain):
    def calculateCircumferentialStress (self):
        externalRadius = self.internalRadius + self.thickness
        self.circumferentialStress = self.workPressure * ((self.internalRadius ** 2) / (externalRadius ** 2 - self.internalRadius ** 2 )) \
            * (1 + (externalRadius ** 2)/(self.internalRadius ** 2))


    def calculateLongitudinalStress (self):
        self.longitudinalStress = 0


    def calculateMaxRadialStress (self):
        externalRadius = self.internalRadius + self.thickness
        self.radialStress = self.workPressure * ((self.internalRadius ** 2) / (externalRadius ** 2 - self.internalRadius ** 2 )) \
            * (1 - (externalRadius ** 2)/(self.internalRadius ** 2))


    def calculateThickness (self):
        #NOT IMPLEMMENTED
        self.thickness = 0
            

    def calculateSM (self):
        self.SM = self.admissiveStress / (self.circumferentialStress - self.radialStress)

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
        newMotorChain.calculatePrincipalStresses()
        newMotorChain.calculateThickness()
        return newMotorChain
    

    @classmethod
    def motorChainStressesCalculation(cls, motorChain):
        newMotorChain = cls(motorChain)
        newMotorChain.calculatePrincipalStresses()
        return newMotorChain