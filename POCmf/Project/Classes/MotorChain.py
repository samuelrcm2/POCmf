from Project.Domain import MaterialsDomain
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
        # According to Huzel e Huang (1992, pág. 289)
        material = \
            MaterialsDomain.Materials.getMaterialById(self.materialId)
        try:
            fy = material['yeldStrength']/1.25
            fu = material['ultimateStrength']/1.5
        except:
            print('Material not Found!')
        else:
            self.admissiveStress = fy if fy < fu else fu
        
