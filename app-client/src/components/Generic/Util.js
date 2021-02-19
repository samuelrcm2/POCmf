export const nameTranslations = {
    admissiveStress: "Admissive Stress",
    longitudinalStress: "Longitudinal Stress",
    circumferentialStress: "Circumferential Stress",
    radialStress: "Radial Stress",
    SM: "Safety Margin",
    thickness: "Thicknesss",
    maxStressSupported: "Screw Maximum Stress Supported",
    vonMisesStress: "Von Mises Stress",
    nozzleReinforcementThickness: "Nozzle Reinforcement Thickness"
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
    nozzleReinforcementThickness: "mm"
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