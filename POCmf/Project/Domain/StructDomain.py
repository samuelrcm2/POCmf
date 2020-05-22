from Project.Classes.ThickVessel import ThickVessel
from Project.Classes.ThinVessel import ThinVessel
from Project import Enums

def handleMotorChainCalculationTypes (motorChain, calculationType):
    newMotorChain = ThinVessel(motorChain) if checkIfIsThinVessel(motorChain) \
        else ThickVessel(motorChain)

    if calculationType == Enums.CalculationType.SAFETY_MARGIN:
        resultMotorChain = newMotorChain.motorChainSMCalculation(motorChain)
        return {"SM": resultMotorChain.SM}
    elif calculationType == Enums.CalculationType.THICKNESS:
        resultMotorChain = newMotorChain.motorChainThicknessCalculation(motorChain)
        return { "thickness": resultMotorChain.thickness}
    else :
        resultMotorChain = newMotorChain.motorChainStressesCalculation(motorChain)
        return {
                "circumferentialStress" : resultMotorChain.circumferentialStress,
                "longitudinalStress" : resultMotorChain.longitudinalStress,
                "radialStress" : resultMotorChain.radialStress
                }    

def checkIfIsThinVessel(motorChain):
    return motorChain["thickness"] / motorChain["internalRadius"] < 0.1