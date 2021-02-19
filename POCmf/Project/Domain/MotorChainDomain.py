from Project.Classes.ThickVessel import ThickVessel
from Project.Classes.ThinVessel import ThinVessel
from Project import Enums

def handleMotorChainCalculationTypes (motorChain, calculationType):
    newMotorChain = ThinVessel(motorChain) if checkIfIsThinVessel(motorChain, calculationType) \
        else ThickVessel(motorChain)

    if calculationType == Enums.CalculationType.SAFETY_MARGIN:
        resultMotorChain = newMotorChain.motorChainSMCalculation(motorChain)
        return {"SM": resultMotorChain.SM}
    elif calculationType == Enums.CalculationType.THICKNESS:
        resultMotorChain = newMotorChain.motorChainThicknessCalculation(motorChain)
        if resultMotorChain.thickness / resultMotorChain.internalRadius > 0.1:
            resultMotorChain = ThickVessel.motorChainThicknessCalculation(motorChain)
        return { "thickness": resultMotorChain.thickness}
    else :
        resultMotorChain = newMotorChain.motorChainStressesCalculation(motorChain)
        return {
                "circumferentialStress" : resultMotorChain.circumferentialStress,
                "longitudinalStress" : resultMotorChain.longitudinalStress,
                "radialStress" : resultMotorChain.radialStress,
                "vonMisesStress": resultMotorChain.vonMisesSress,
                "nozzleReinforcementThickness": resultMotorChain.nozzleReinforcementThickness
                }    

def checkIfIsThinVessel(motorChain, calculationType = Enums.CalculationType.SAFETY_MARGIN):
    return motorChain["thickness"] / motorChain["internalRadius"] < 0.1 if calculationType != Enums.CalculationType.THICKNESS \
        else True