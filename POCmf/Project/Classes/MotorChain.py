from Project.Domain import MaterialsDomain
from Project.Classes.ProjectHandler import ProjectHandler
from Project.Classes.HeatEffect import HeatEffect
import math

class MotorChain (ProjectHandler):
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
        self.vonMisesSress: float = None
        self.nozzleReinforcementThickness: float = None
        self.hasAditionalHeatStress: bool = motorChain['hasAditionalHeatStress']
        self.additionalHeatStress: HeatEffect = HeatEffect(motorChain['temperatureVariation']) if motorChain['temperatureVariation'] is not None else None

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
        
    def calculateVonMisesStress (self):
        s_1 = self.circumferentialStress + self.additionalHeatStress.circumferentialStress if self.hasAditionalHeatStress else self.circumferentialStress
        s_2 = self.longitudinalStress + self.additionalHeatStress.longitudinalStress if self.hasAditionalHeatStress else self.longitudinalStress
        s_3 = self.radialStress + self.additionalHeatStress.radialStress if self.hasAditionalHeatStress else self.radialStress
        self.vonMisesSress = (((s_1 - s_2)**2 + (s_2 - s_3)**2 + (s_1 - s_3)**2)/2) ** 0.5

    def calculateNozzleReinforcementThickness (self):
        self.nozzleReinforcementThickness = 2.5 * self.thickness

    def calculateAdditionHeatStress (self):
        material = \
            MaterialsDomain.Materials.getMaterialById(self.materialId)
        self.calculateHeatMaxRadialStress(material)
        self.calculateHeatLongitudinalStress(material)
        self.calculateHeatCircumferentialStress(material)

    def calculateSM(self):
        material = \
            MaterialsDomain.Materials.getMaterialById(self.materialId)
        self.SM = material['yeldStrength']/self.vonMisesSress