from Domain import MaterialsDomain
import math

class MotorChain:
    def __init__ (self, motorChain):
        self.radius: float = motorChain['radius']
        self.height: float = motorChain['height']
        self.thicness: float = motorChain['thickness']
        self.volume: float = self.height * math.pi  * (self.radius ** 2)
        self.workPressure: float = motorChain['workPressure']
        self.materialId: int = motorChain['materialId']
        self.admissiveStress: float = None
        self.SM: float = None
        self.circumferentialStress: float = motorChain['circumferentialStress']
        self.longitudinalStress: float = motorChain['longitudinalStress']
        
    def __str__(self):
        return f"Motor chain properties: \n \
            Height: {self.height} mm \n \
            Radius: {self.radius} mm \n \
            Thickness: {self.thicness} mm \n \
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
        #Considering 100% weld eficiency 
        #Considering external and internal radius
        self.circumferentialStress  = \
            (self.workPressure * self.radius) / self.thicness
        
    def calculateLongitudinalStress (self):
        #TODO -- Considering external and internal radius
        # circumferential_area: float = \
        #      ((self.radius + self.thicness) ** 2 - self.radius ** 2)
        # circumferential_chain_area: float = (self.radius ** 2)
        self.longitudinalStress = \
            (self.workPressure * self.radius) / (2 * self.thicness)
            
    def calculateThickness (self):
        thicknessByCircumferentialStress = \
            (self.workPressure * self.radius) / self.circumferentialStress
        thicknessByLongitudinalStress = \
            (self.workPressure * self.radius) / (2 * self.longitudinalStress)
        self.thicness = thicknessByCircumferentialStress if \
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
        newMotorChain = cls(motorChain)
        newMotorChain.calculateCircumferentialStress()
        newMotorChain.calculateLongitudinalStress()
        return newMotorChain
    
def handleMotorChainCalculationTypes (motorChain, calculationType):
    if calculationType == 0:
        newMotorChain = MotorChain.motorChainSMCalculation(motorChain)
        return {"SM": newMotorChain.SM}
    elif calculationType == 1:
        newMotorChain = MotorChain.motorChainThicknessCalculation(motorChain)
        return { "thickness": newMotorChain.thicness}
    else :
        newMotorChain = MotorChain.motorChainStressesCalculation(motorChain)
        return {
                "circumferentialStress" : newMotorChain.circumferentialStress,
                "longitudinalStress" : newMotorChain.longitudinalStress,
                }    
