from Project.Classes.MotorChain import MotorChain
from Project.Domain import MotorChainDomain
from Project import Enums
import matplotlib.pyplot as plt
import copy
import math
mockThinVase = {
    "volume": None,
    "admissiveStress": None,
    "SM": None,
    "circumferentialStress": None,
    "longitudinalStress": None,
    "radialStress": None,
    "vonMisesSress": None,
    "nozzleReinforcementThickness": None,
    "additionalHeatStress": None,
    "material": None,
    "temperatureVariation": None,
    "internalRadius": 20,
    "height": 100,
    "thickness": 1,
    "workPressure": 40,
    "materialId": 1,
    "hasAditionalHeatStress": False
}

mockThickVase = {
    "volume": None,
    "admissiveStress": None,
    "SM": None,
    "circumferentialStress": None,
    "longitudinalStress": None,
    "radialStress": None,
    "vonMisesSress": None,
    "nozzleReinforcementThickness": None,
    "additionalHeatStress": None,
    "material": None,
    "temperatureVariation": None,
    "internalRadius": 20,
    "height": 100,
    "thickness": 4,
    "workPressure": 40,
    "materialId": 1,
    "hasAditionalHeatStress": False
}

mockThinVaseHeat = {
    "volume": None,
    "admissiveStress": None,
    "SM": None,
    "circumferentialStress": None,
    "longitudinalStress": None,
    "radialStress": None,
    "vonMisesSress": None,
    "nozzleReinforcementThickness": None,
    "additionalHeatStress": None,
    "material": None,
    "temperatureVariation": None,
    "internalRadius": 20,
    "height": 100,
    "thickness": 1.9,
    "workPressure": 40,
    "materialId": 1,
    "hasAditionalHeatStress": True
}

mockThickVaseHeat = {
    "volume": None,
    "admissiveStress": None,
    "SM": None,
    "circumferentialStress": None,
    "longitudinalStress": None,
    "radialStress": None,
    "vonMisesSress": None,
    "nozzleReinforcementThickness": None,
    "additionalHeatStress": None,
    "material": None,
    "temperatureVariation": None,
    "internalRadius": 20,
    "height": 100,
    "thickness": 4,
    "workPressure": 40,
    "materialId": 1,
    "hasAditionalHeatStress": True
}

def truncate(number, decimals=0):
    """
    Returns a value truncated to a specific number of decimal places.
    """
    if not isinstance(decimals, int):
        raise TypeError("decimal places must be an integer.")
    elif decimals < 0:
        raise ValueError("decimal places has to be 0 or more.")
    elif decimals == 0:
        return math.trunc(number)

    factor = 10.0 ** decimals
    return math.trunc(number * factor) / factor

class PlotScripts():
    def __init__(self):
        self.plots = 2

    def generatePlots(self):
        example_motor =  {
            "volume": None,
            "admissiveStress": None,
            "SM": None,
            "circumferentialStress": None,
            "longitudinalStress": None,
            "radialStress": None,
            "vonMisesSress": None,
            "nozzleReinforcementThickness": None,
            "additionalHeatStress": None,
            "material": None,
            "temperatureVariation": None,
            "internalRadius": 20,
            "height": 100,
            "thickness": 1,
            "workPressure": 40,
            "materialId": 16,
            "hasAditionalHeatStress": False
        }
        # self.plotPrincipalStresses(copy.deepcopy(example_motor))
        # self.generateRelativePrincipalStresses(copy.deepcopy(example_motor))
        # self.plotPrincipalStressesMethodsDiff(copy.deepcopy(example_motor))
        example_motor["hasAditionalHeatStress"] = True
        example_motor["temperatureVariation"] = 100
        # self.plotPrincipalStressesHeat(copy.deepcopy(example_motor))
        # self.generateRelativePrincipalStressesHeat(copy.deepcopy(example_motor))
        # self.plotPrincipalStressesMethodsHeatDiff(copy.deepcopy(example_motor))
        self.plotPrincipalStressesRelativeHeat(copy.deepcopy(example_motor))

    def plotPrincipalStresses(self, example_motor):
        x_thickness_ratio = []
        y_sigma_l = []
        y_sigma_t = []
        y_sigma_r = []
        results = {}
        while example_motor["thickness"] < 5:
            results = MotorChainDomain.handleMotorChainCalculationTypes(example_motor, Enums.CalculationType.SAFETY_MARGIN)
            x_thickness_ratio.append(example_motor["thickness"]/example_motor["internalRadius"])
            y_sigma_l.append(results["longitudinalStress"])
            y_sigma_t.append(results["circumferentialStress"])
            y_sigma_r.append(results["radialStress"])
            example_motor["thickness"] = example_motor["thickness"] + 0.01 

        fig, ax = plt.subplots()
        ax.plot(x_thickness_ratio, y_sigma_l, label="Tensão Longitudinal")
        ax.plot(x_thickness_ratio, y_sigma_t, label="Tensão Circunferencial")
        ax.plot(x_thickness_ratio, y_sigma_r, label="Tensão Radial")
        ax.set_title("Tensões Principais no Vaso de pressão")
        ax.set_xlabel("Espessura / Raio Interno ")
        ax.set_ylabel("Tensão (Mpa)")
        plt.axvline(x=0.1, label="Limiar entre métodos", linestyle='--', color='black', linewidth=0.5)
        plt.legend()
        plt.show()

    def generateRelativePrincipalStresses(self, example_motor):
        x_thickness_ratio = []
        y_sigma_l = []
        y_sigma_t = []
        y_sigma_r = []
        results = {}
        totalStress = 0
        while example_motor["thickness"] < 5:
            results = MotorChainDomain.handleMotorChainCalculationTypes(example_motor, Enums.CalculationType.SAFETY_MARGIN)
            x_thickness_ratio.append(example_motor["thickness"]/example_motor["internalRadius"])
            totalStress = results["longitudinalStress"] + results["circumferentialStress"] + abs(results["radialStress"])
            y_sigma_l.append(results["longitudinalStress"]/totalStress)
            y_sigma_t.append(results["circumferentialStress"]/totalStress)
            y_sigma_r.append(abs(results["radialStress"])/totalStress)
            example_motor["thickness"] = example_motor["thickness"] + 0.01 

        fig, ax = plt.subplots()
        ax.plot(x_thickness_ratio, y_sigma_l, label="Tensão Longitudinal")
        ax.plot(x_thickness_ratio, y_sigma_t, label="Tensão Circunferencial")
        ax.plot(x_thickness_ratio, y_sigma_r, label="Tensão Radial")
        ax.set_title("Tensões Principais Relativas no Vaso de pressão")
        ax.set_xlabel("Espessura / Raio Interno ")
        ax.set_ylabel("Percentual na Soma das Tensões")
        ax.set_ylim([-0.1,1])
        plt.axvline(x=0.1, label="Limiar entre métodos", linestyle='--', color='black', linewidth=0.5)
        plt.legend()
        plt.show()

    def plotPrincipalStressesHeat(self, example_motor):
        x_thickness_ratio = []
        y_sigma_l = []
        results = {}
        totalStress = 0
        i = 0
        fig, ax = plt.subplots()
        label = ''
        while example_motor["temperatureVariation"] < 400:
            while example_motor["thickness"] < 5:
                results = MotorChainDomain.handleMotorChainCalculationTypes(example_motor, Enums.CalculationType.SAFETY_MARGIN)
                if i == 0:
                    x_thickness_ratio.append(example_motor["thickness"]/example_motor["internalRadius"])
                y_sigma_l.append(results["heatAdditionlaCircumferentialStress"])
                example_motor["thickness"] = example_motor["thickness"] + 0.01 
            _label = "T(ri) = " + str(example_motor["temperatureVariation"]) + "K"
            ax.plot(x_thickness_ratio, y_sigma_l, label=_label)
            y_sigma_l = []
            i = i + 1
            example_motor["thickness"] = 1
            example_motor["temperatureVariation"] = example_motor["temperatureVariation"] + 50
        ax.set_title("Tensão Longitudinal/Circunferencial no Vaso de pressão com Efeitos Térmicos")
        ax.set_xlabel("Espessura / Raio Interno ")
        ax.set_ylabel("Tensão (Mpa)")
        plt.axvline(x=0.1, label="Limiar entre métodos", linestyle='--', color='black', linewidth=0.5)
        plt.legend()
        plt.gca().legend(loc='center right')
        plt.show()

    def generateRelativePrincipalStressesHeat(self, example_motor):
        x_thickness_ratio = []
        y_sigma_l = []
        y_sigma_t_thick = []
        results = {}
        results_thick = {}
        totalStress = 0
        fig, ax = plt.subplots()
        is_first = True
        is_first_thick = True
        thin_vase_tension = 0
        label = ''
        simga_l = 0
        while example_motor["thickness"] < 5:
            results = MotorChainDomain.handleMotorChainCalculationTypes(example_motor, Enums.CalculationType.SAFETY_MARGIN)
            x_thickness_ratio.append(example_motor["thickness"]/example_motor["internalRadius"])
            results_thick = MotorChainDomain.resultFromThickVase(example_motor, Enums.CalculationType.SAFETY_MARGIN)
            if is_first:
                thin_vase_tension = results["heatAdditionlaCircumferentialStress"]
                is_first = False
            sigma_l = results["heatAdditionlaCircumferentialStress"]/thin_vase_tension
            if example_motor["thickness"]/example_motor["internalRadius"] > 0.1 and is_first_thick:
                is_first_thick = False
                plt.text(example_motor["thickness"]/example_motor["internalRadius"],sigma_l, str(truncate(sigma_l, 3)),horizontalalignment='right')
            y_sigma_l.append(sigma_l)
            y_sigma_t_thick.append(results_thick["heatAdditionlaCircumferentialStress"]/thin_vase_tension)
            example_motor["thickness"] = example_motor["thickness"] + 0.01 
        ax.plot(x_thickness_ratio, y_sigma_l, color='blue')
        ax.plot(x_thickness_ratio, y_sigma_t_thick,linestyle='--', color='blue', label="Tensão Longitudinal/Circunferencial Parede Espessa/Parede Fina")
        ax.set_title("Tensão Longitudinal/Circunferencial Relativa no Vaso de pressão com Efeitos Térmicos")
        ax.set_xlabel("Espessura / Raio Interno ")
        ax.set_ylabel("Tensão térmica / Tensão térmica parede fina")
        ax.set_ylim([0.9,1.5])
        plt.axvline(x=0.1, label="Limiar entre métodos", linestyle='--', color='black', linewidth=0.5)
        plt.legend()
        plt.gca().legend(loc='center right')
        plt.show()

    def plotPrincipalStressesMethodsDiff(self, example_motor):
        x_thickness_ratio = []
        y_sigma_l_thin = []
        y_sigma_t_thin = []
        y_sigma_r_thin = []
        y_sigma_l_thick = []
        y_sigma_t_thick = []
        y_sigma_r_thick = []
        results_thin, results_thick = {}, {}
        is_first_thick = True
        fig, ax = plt.subplots()
        while example_motor["thickness"] < 5:
            results_thin = MotorChainDomain.resultFromThinVase(example_motor, Enums.CalculationType.SAFETY_MARGIN)
            results_thick = MotorChainDomain.resultFromThickVase(example_motor, Enums.CalculationType.SAFETY_MARGIN)
            x_thickness_ratio.append(example_motor["thickness"]/example_motor["internalRadius"])
            # y_sigma_l_thin.append(results_thin["longitudinalStress"])
            # y_sigma_t_thin.append(results_thin["circumferentialStress"])
            # y_sigma_r_thin.append(results_thin["radialStress"])
            if example_motor["thickness"]/example_motor["internalRadius"] > 0.1 and is_first_thick:
                is_first_thick = False
                plt.text(example_motor["thickness"]/example_motor["internalRadius"],results_thick["longitudinalStress"]/results_thin["longitudinalStress"], str(truncate(results_thick["longitudinalStress"]/results_thin["longitudinalStress"], 3)))
                plt.text(example_motor["thickness"]/example_motor["internalRadius"],results_thick["circumferentialStress"]/results_thin["circumferentialStress"], str(truncate(results_thick["circumferentialStress"]/results_thin["circumferentialStress"], 3)),horizontalalignment='right')
            y_sigma_l_thick.append(results_thick["longitudinalStress"]/results_thin["longitudinalStress"])
            y_sigma_t_thick.append(results_thick["circumferentialStress"]/results_thin["circumferentialStress"])
            # y_sigma_r_thick.append(results_thick["radialStress"]/results_thin["radialStress"])
            example_motor["thickness"] = example_motor["thickness"] + 0.01 

        plt.axvline(x=0.1, label="Limiar entre métodos", linestyle='--', color='black', linewidth=0.5)
        # ax.plot(x_thickness_ratio, y_sigma_l_thin, color='blue', label="Tensão Longitudinal Parede Fina")
        # ax.plot(x_thickness_ratio, y_sigma_t_thin, color='red', label="Tensão Circunferencial Parede Fina")
        # ax.plot(x_thickness_ratio, y_sigma_r_thin, color='orange', label="Tensão Radial Parede Fina")
        ax.plot(x_thickness_ratio, y_sigma_l_thick, color='blue', label="Tensão Longitudinal Parede Espessa / Parede Fina")
        ax.plot(x_thickness_ratio, y_sigma_t_thick, color='red', label="Tensão Circunferencial Parede Espessa / Parede Fina")
        # ax.plot(x_thickness_ratio, y_sigma_r_thick, color='orange', label="Tensão Radial Parede Espessa")
        
        ax.set_title("Variação Relativa das Tensões Principais no Vaso de pressão")
        ax.set_xlabel("Espessura / Raio Interno ")
        ax.set_ylabel("Razão entre as Tensões")
        plt.legend()
        plt.show()

    def plotPrincipalStressesMethodsHeatDiff(self, example_motor):
        x_thickness_ratio = []
        y_sigma_l_thin = []
        y_sigma_t_thin = []
        y_sigma_r_thin = []
        y_sigma_l_thick = []
        y_sigma_t_thick = []
        y_sigma_r_thick = []
        results_thin, results_thick = {}, {}
        while example_motor["thickness"] < 5:
            results_thin = MotorChainDomain.resultFromThinVase(example_motor, Enums.CalculationType.SAFETY_MARGIN)
            results_thick = MotorChainDomain.resultFromThickVase(example_motor, Enums.CalculationType.SAFETY_MARGIN)
            x_thickness_ratio.append(example_motor["thickness"]/example_motor["internalRadius"])
            y_sigma_t_thick.append(results_thick["heatAdditionlaCircumferentialStress"]/results_thin["heatAdditionlaCircumferentialStress"])
            example_motor["thickness"] = example_motor["thickness"] + 0.01 

        fig, ax = plt.subplots()
        ax.plot(x_thickness_ratio, y_sigma_t_thick,linestyle='--', color='red', label="Tensão Longitudinal/Circunferencial Parede Espessa/Parede Fina")
        plt.axvline(x=0.1, label="Limiar entre métodos", linestyle='--', color='black', linewidth=0.5)
        ax.set_title("Tensões Térmicas no Vaso de pressão por Método")
        ax.set_xlabel("Espessura / Raio Interno ")
        ax.set_ylabel("Tensão (Mpa)")
        plt.legend()
        plt.show()

    def plotPrincipalStressesRelativeHeat(self, example_motor):
        x_thickness_ratio = []
        y_sigma_l, y_sigma_t = [], []
        results = {}
        totalStress = 0
        i = 0
        figl, axl = plt.subplots()
        figt, axt = plt.subplots()
        label = ''
        while example_motor["temperatureVariation"] < 400:
            while example_motor["thickness"] < 5:
                results = MotorChainDomain.handleMotorChainCalculationTypes(example_motor, Enums.CalculationType.SAFETY_MARGIN)
                if i == 0:
                    x_thickness_ratio.append(example_motor["thickness"]/example_motor["internalRadius"])
                y_sigma_l.append(results["heatAdditionlaCircumferentialStress"]/results["circumferentialStress"])
                y_sigma_t.append(results["heatAdditionlaLongitudinalStress"]/results["longitudinalStress"])
                example_motor["thickness"] = example_motor["thickness"] + 0.01 
            _label_l = " T(ri) = " + str(example_motor["temperatureVariation"]) + "K"
            axl.plot(x_thickness_ratio, y_sigma_l, label=(r'$\sigma_l*/\sigma_l$' +" T(ri) = " + str(example_motor["temperatureVariation"]) + "K"))
            axt.plot(x_thickness_ratio, y_sigma_t, label=(r'$\sigma_t*/\sigma_t$' +" T(ri) = " + str(example_motor["temperatureVariation"]) + "K"))
            y_sigma_l, y_sigma_t = [], []
            i = i + 1
            example_motor["thickness"] = 1
            example_motor["temperatureVariation"] = example_motor["temperatureVariation"] + 50
        axl.set_title("Razão tensão térmica longitudinal / tensão longitudinal no vaso de pressão ")
        axl.set_xlabel("Espessura / Raio Interno ")
        axl.set_ylabel(r'$\sigma_l*/\sigma_l$')
        axl.legend()
        axt.set_title("Razão tensão térmica circunferencial / tensão circunferencial no vaso de pressão ")
        axt.set_xlabel("Espessura / Raio Interno ")
        axt.set_ylabel(r'$\sigma_t*/\sigma_t$')
        axl.axvline(x=0.1, label="Limiar entre métodos", linestyle='--', color='black', linewidth=0.5)
        axt.axvline(x=0.1, label="Limiar entre métodos", linestyle='--', color='black', linewidth=0.5)
        axt.legend()
        plt.show()