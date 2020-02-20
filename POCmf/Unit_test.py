import unittest
from Domain import StructDomain 
from Infra import MaterialInfra

objectTest: object = {
    "radius": 5, # mm
    "height": 40, # mm
    "thickness": 1, # mm
    "yield_stress": 40, # MPa
    "max_stress": 80, # MPa
    "work_pressure": 4, # MPa
    "SM": 1.15,
    "material_id": 1,
    "circumferential_stress": 12, #MPa
    "longitudinal_stress": 6, ##MPa
    "type_calculation": 0, # 0 - Calculate SM, 1 - Thickness, 2- circunferencial and logitudinal stresses
}

motorChainTest = StructDomain.MotorChain(objectTest)

class testStructDoamin(unittest.TestCase):    
    def test_calculate_admissive_stress(self):
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculate_admissive_stress()
        self.assertEqual(motorChainTest.admissive_stress, 24.8)
        
    def test_calculate_admissive_stress_String(self):
        objectTest["material_id"] = 900
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculate_admissive_stress()
        self.assertEqual(motorChainTest.admissive_stress, None)

    def test_calculate_circumferential_stress(self):
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculate_circumferential_stress()
        self.assertEqual(motorChainTest.circumferential_stress, 20)
        
    def test_calculate_longitudinal_stress(self):
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculate_longitudinal_stress()
        self.assertEqual(motorChainTest.longitudinal_stress, 10)
        
    def test_calculate_thickness(self):
        objectTest['thickness'] = None
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculate_thickness()
        self.assertAlmostEqual(motorChainTest.thicness, 1.66667, 3)
        
    def test_calculate_SM(self):
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculate_admissive_stress()
        motorChainTest.calculate_SM()
        self.assertAlmostEqual(motorChainTest.SM, 2.06667, 2)
        
if  __name__== '__main__':
    unittest.main()