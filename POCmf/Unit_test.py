import unittest
from Domain import StructDomain 
from Infra import MaterialInfra

objectTest: object = {
    "internalRadius": 5, # mm
    "height": 40, # mm
    "thickness": 1, # mm
    "yield_stress": 40, # MPa
    "max_stress": 80, # MPa
    "workPressure": 4, # MPa
    "SM": 1.15,
    "materialId": 1,
    "circumferentialStress": 12, #MPa
    "longitudinalStress": 6, ##MPa
    "type_calculation": 0, # 0 - Calculate SM, 1 - Thickness, 2- circunferencial and logitudinal stresses
}

motorChainTest = StructDomain.MotorChain(objectTest)

class testStructDoamin(unittest.TestCase):    
    def test_calculateAdmissiveStress(self):
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculateAdmissiveStress()
        self.assertEqual(motorChainTest.admissiveStress, 24.8)
        
    def test_calculateAdmissiveStress_String(self):
        objectTest["materialId"] = 900
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculateAdmissiveStress()
        self.assertEqual(motorChainTest.admissiveStress, None)

    def test_calculateCircumferentialStress(self):
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculateCircumferentialStress()
        self.assertEqual(motorChainTest.circumferentialStress, 20)
        
    def test_calculateLongitudinalStress(self):
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculateLongitudinalStress()
        self.assertEqual(motorChainTest.longitudinalStress, 10)
        
    def test_calculateThickness(self):
        objectTest['thickness'] = None
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculateThickness()
        self.assertAlmostEqual(motorChainTest.thickness, 1.66667, 3)
        
    def test_calculateSM(self):
        motorChainTest = StructDomain.MotorChain(objectTest)
        motorChainTest.calculateAdmissiveStress()
        motorChainTest.calculateSM()
        self.assertAlmostEqual(motorChainTest.SM, 2.06667, 2)
        
if  __name__== '__main__':
    unittest.main()