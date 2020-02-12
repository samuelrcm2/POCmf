import math

class MotorChain:
    def __init__ (self, motorChain):
        self.radius: float = motorChain['radius']
        self.height: float = motorChain['height']
        self.thicness: float = motorChain['thickness']
        self.volume: float = self.height * math.pi  * (self.radius ** 2)
        self.work_pressure: float = motorChain['work_pressure']
        self.admissive_stress: float = None
        self.SM: float = None
        self.circumferential_stress: float = motorChain['circumferential_stress']
        self.longitudinal_stress: float = motorChain['longitudinal_stress']
        #Implement material search
        
    def __str__(self):
        return f"Motor chain properties: \n \
            Height: {self.height} mm \n \
            Radius: {self.radius} mm \n \
            Thickness: {self.thicness} mm \n \
            Work Pressure: {self.work_pressure} MPa \n \
            Admissive Stress: {self.admissive_stress} MPa \n \
            Circunferencial Stress: {self.circumferential_stress} MPa \n \
            Longitudinal Stress: {self.longitudinal_stress} MPa \
            "
        
    def calculate_admissive_stress (self, fy , fu):
        #Implement material search
        try:
            fy = float(fy)
            fu = float(fu)
        except:
            print('The stress values must be numbers!')
        else:
            self.admissive_stress = fy/1.25 if fy/1.25 < fu/1.5 else fu/1.5
        
    def calculate_circumferential_stress (self):
        #Considering 100% weld eficiency 
        #Considering external and internal radius
        self.circumferential_stress  = \
            (self.work_pressure * self.radius) / self.thicness
        
    def calculate_longitudinal_stress (self):
        #TODO -- Considering external and internal radius
        # circumferential_area: float = \
        #      ((self.radius + self.thicness) ** 2 - self.radius ** 2)
        # circumferential_chain_area: float = (self.radius ** 2)
        self.longitudinal_stress = \
            (self.work_pressure * self.radius) / (2 * self.thicness)
            
    def calculate_thickness (self):
        thickness_by_circumferential_stress = \
            (self.work_pressure * self.radius) / self.circumferential_stress
        thickness_by_longitudinal_stress = \
            (self.work_pressure * self.radius) / (2 * self.longitudinal_stress)
        self.thicness = thickness_by_circumferential_stress if \
            thickness_by_circumferential_stress < thickness_by_longitudinal_stress \
            else thickness_by_longitudinal_stress
            
    def calculate_SM (self):
        max_stress = self.circumferential_stress if self.circumferential_stress > \
            self.longitudinal_stress else self.longitudinal_stress
        self.SM = self.admissive_stress / max_stress
        
    @classmethod
    def motorChain_SM_calculation(cls, motor_chain):
        motor_chain['SM'] = None
        new_motor_chain = cls(motor_chain)
        new_motor_chain.calculate_admissive_stress(\
            motor_chain['yield_stress'], motor_chain['max_stress'])
        new_motor_chain.calculate_SM()
        return new_motor_chain
    
    @classmethod
    def motorChain_thickness_calculation(cls, motor_chain):
        motor_chain['thickness'] = None
        new_motor_chain = cls(motor_chain)
        new_motor_chain.calculate_thickness()
        return new_motor_chain
    
    @classmethod
    def motorChain_stresses_calculation(cls, motor_chain):
        motor_chain['circumferential_stress'] = None
        motor_chain['longitudinal_stress'] = None
        new_motor_chain = cls(motor_chain)
        new_motor_chain.calculate_circumferential_stress()
        new_motor_chain.calculate_longitudinal_stress()
        return new_motor_chain
    
def handle_MotorChain_calculation_types (motor_chain):
    if motor_chain['type_calculation'] == 0:
        new_motor_chain = MotorChain.motorChain_SM_calculation(motor_chain)
        return new_motor_chain.SM
    elif motor_chain['type_calculation'] == 1:
        new_motor_chain = MotorChain.motorChain_thickness_calculation(motor_chain)
        return new_motor_chain.thicness
    else :
        new_motor_chain = MotorChain.motorChain_stresses_calculation(motor_chain)
        return {
                "circumferential_stress" : new_motor_chain.circumferential_stress,
                "longitudinal_stress" : new_motor_chain.longitudinal_stress,
                }    
    
objectTest: object = {
    "radius": 5, # mm
    "height": 40, # mm
    "thickness": 1, # mm
    "yield_stress": 40, # MPa
    "max_stress": 80, # MPa
    "work_pressure": 4, # MPa
    "SM": 1.15,
    "circumferential_stress": 14, #MPa
    "longitudinal_stress": 6, ##MPa
    "type_calculation": 0, # 0 - Calculate SM, 1 - Thickness, 2- circunferencial and logitudinal stresses
}

# test = MotorChain(objectTest)
# print(test.admissive_stress)
# print(test.circumferential_stress)
# print(test.longitudinal_stress)
# print(test)
# print(test.calculate_admissive_stress(40, 'a'))