export const nameTranslations = {
    admissiveStress: "Admissive Stress",
    longitudinalStress: "Longitudinal Stress",
    circumferentialStress: "Circumferential Stress",
    radialStress: "Radial Stress",
    SM: "Safety Margin",
    thickness: "Thicknesss",
    maxStressSupported: "Screw Maximum Stress Supported",
    vonMisesStress: "Von Mises Stress",
    nozzleReinforcementThickness: "Nozzle Reinforcement Thickness",
    heatAdditionlaCircumferentialStress: "Thermical Circumferential Stress",
    heatAdditionlaLongitudinalStress: "Thermical Longitudinal Stress",
    heatAdditionlaRadialStress: "Thermical Radial Stress"
  };

export const unitTranslation = {
    admissiveStress: "MPa",
    longitudinalStress: "MPa",
    circumferentialStress: "MPa",
    radialStress: "MPa",
    SM: "",
    thickness: "mm",
    maxStressSupported: "MPa",
    vonMisesStress: "MPa",
    nozzleReinforcementThickness: "mm",
    heatAdditionlaCircumferentialStress: "MPa",
    heatAdditionlaLongitudinalStress: "MPa",
    heatAdditionlaRadialStress: "MPa"
}

export const FormatCalculosResponse = calc => {
    if (!calc) return calc;
    const formattedData = [];
    for (let [Key, value] of Object.entries(calc)) 
        if (value != null) 
            formattedData.push({
                name: Key,
                value: value
            });
        
    return formattedData;
}