from Project.Classes.MotorChain import MotorChain

ACCEPTABLE_ERROR = 0.0001

class ThickVessel (MotorChain):
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
        #Using Newton's Method
        radiusAdd = 1
        estimatedExternalRadius = self.internalRadius + radiusAdd
        radialStress: float 
        while True:
            if estimatedExternalRadius > self.internalRadius :
                radialStress = self.calculateMaxRadialStressByExternalRadius(estimatedExternalRadius)
                derivativeRadialStress = self.calculateMaxRadialStressDerivativeByExternalRadius(estimatedExternalRadius)
                estimatedExternalRadius -= radialStress/derivativeRadialStress
            else:
                radiusAdd = radiusAdd/2
                estimatedExternalRadius = self.internalRadius + radiusAdd
                continue 

            if radiusAdd < 0.02:
                raise Exception('The value for Radial Stress cannot be real for the internal radius selected')
            if self.radialStress - self.calculateMaxRadialStressByExternalRadius(estimatedExternalRadius) < ACCEPTABLE_ERROR:
                break
        self.thickness = estimatedExternalRadius - self.internalRadius
            

    def calculateSM (self):
        self.SM = self.admissiveStress / (self.circumferentialStress - self.radialStress)

    def calculatePrincipalStresses (self):
        self.calculateCircumferentialStress()
        self.calculateLongitudinalStress()
        self.calculateMaxRadialStress()

    
    def calculateMaxRadialStressByExternalRadius(self, externalRadius):
        return self.workPressure * ((self.internalRadius ** 2 + externalRadius ** 2) / (externalRadius ** 2 - self.internalRadius ** 2 )) 


    def calculateMaxRadialStressDerivativeByExternalRadius(self, externalRadius):
        return 4 * self.workPressure * (( externalRadius * self.internalRadius ** 2 ) / (externalRadius ** 2 - self.internalRadius ** 2 )**2) 


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