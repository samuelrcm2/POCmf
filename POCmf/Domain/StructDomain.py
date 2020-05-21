from Domain import MaterialsDomain
import math

class MotorChain:
    def __init__ (self, motorChain):
        self.internalRadius: float = motorChain['internalRadius']
        self.height: float = motorChain['height']
        self.thickness: float = motorChain['thickness']
        self.volume: float = self.height * math.pi  * (self.internalRadius ** 2)
        self.workPressure: float = motorChain['workPressure']
        self.materialId: int = motorChain['materialId']
        self.admissiveStress: float = None
        self.SM: float = None
        self.circumferentialStress: float = motorChain['circumferentialStress'] #Same as tangential
        self.longitudinalStress: float = motorChain['longitudinalStress']
        self.radialStress: float = motorChain['radialStress']

    def __str__(self):
        return f"Motor chain properties: \n \
            Height: {self.height} mm \n \
            Radius: {self.internalRadius} mm \n \
            Thickness: {self.thickness} mm \n \
            Work Pressure: {self.workPressure} MPa \n \
            Admissive Stress: {self.admissiveStress} MPa \n \
            Circunferencial Stress: {self.circumferentialStress} MPa \n \
            Longitudinal Stress: {self.longitudinalStress} MPa \
            "
        
    def calculateAdmissiveStress (self):
        material = \
            MaterialsDomain.Materials.getMaterialById(self.materialId)
        try:
            fy = material['yeldStrength']/1.25
            fu = material['ultimateStrength']/1.5
        except:
            print('Material not Found!')
        else:
            self.admissiveStress = fy if fy < fu else fu
        
    def calculateCircumferentialStress (self):
        if self.thickness / self.internalRadius < 0.1: # It can considerate thin wall vessel
            self.circumferentialStress  = \
                (self.workPressure * self.internalRadius) / self.thickness
        else:
            externalRadius = self.internalRadius + self.thickness
            self.circumferentialStress = self.workPressure * ((self.internalRadius ** 2) / (externalRadius ** 2 - self.internalRadius ** 2 )) \
                * (1 + (externalRadius ** 2)/(self.internalRadius ** 2))

    def calculateLongitudinalStress (self):
        if self.thickness / self.internalRadius < 0.1: # It can considerate thin wall vessel
            self.longitudinalStress = \
                (self.workPressure * self.internalRadius) / (2 * self.thickness)
        else: self.longitudinalStress = 0

    def calculateMaxRadialStress (self):
        if self.thickness / self.internalRadius < 0.1: # It can considerate thin wall vessel
            self.radialStress = None
            return

        externalRadius = self.internalRadius + self.thickness
        self.radialStress = self.workPressure * ((self.internalRadius ** 2) / (externalRadius ** 2 - self.internalRadius ** 2 )) \
            * (1 - (externalRadius ** 2)/(self.internalRadius ** 2))

    def calculateThickness (self):
        thicknessByCircumferentialStress = \
            (self.workPressure * self.internalRadius) / self.circumferentialStress
        thicknessByLongitudinalStress = \
            (self.workPressure * self.internalRadius) / (2 * self.longitudinalStress)
        self.thickness = thicknessByCircumferentialStress if \
            thicknessByCircumferentialStress < thicknessByLongitudinalStress \
            else thicknessByLongitudinalStress
            
    def calculateSM (self):
        maxStress = self.circumferentialStress if self.circumferentialStress > \
            self.longitudinalStress else self.longitudinalStress
        self.SM = self.admissiveStress / maxStress
        
    @classmethod
    def motorChainSMCalculation(cls, motorChain):
        motorChain['SM'] = None
        newMotorChain = cls(motorChain)
        newMotorChain.calculateAdmissiveStress()
        newMotorChain.calculateSM()
        return newMotorChain
    
    @classmethod
    def motorChainThicknessCalculation(cls, motorChain):
        motorChain['thickness'] = None
        newMotorChain = cls(motorChain)
        newMotorChain.calculateThickness()
        return newMotorChain
    
    @classmethod
    def motorChainStressesCalculation(cls, motorChain):
        motorChain['circumferentialStress'] = None
        motorChain['longitudinalStress'] = None
        motorChain['radialStress'] = None
        newMotorChain = cls(motorChain)
        newMotorChain.calculateCircumferentialStress()
        newMotorChain.calculateLongitudinalStress()
        newMotorChain.calculateMaxRadialStress()
        return newMotorChain
    
def handleMotorChainCalculationTypes (motorChain, calculationType):
    if calculationType == 0:
        newMotorChain = MotorChain.motorChainSMCalculation(motorChain)
        return {"SM": newMotorChain.SM}
    elif calculationType == 1:
        newMotorChain = MotorChain.motorChainThicknessCalculation(motorChain)
        return { "thickness": newMotorChain.thickness}
    else :
        newMotorChain = MotorChain.motorChainStressesCalculation(motorChain)
        return {
                "circumferentialStress" : newMotorChain.circumferentialStress,
                "longitudinalStress" : newMotorChain.longitudinalStress,
                "radialStress" : newMotorChain.radialStress if newMotorChain.radialStress else None
                }    
