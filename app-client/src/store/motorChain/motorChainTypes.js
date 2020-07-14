// Classes
export class Material {
  id;
  name;
  yeldStrength;
  ultimateStrength;
  density;
}

export class MotorChain {
  internalRadius;
  height;
  thickness;
  volume;
  workPressure;
  materialId;
  admissiveStress;
  longitudinalStress;
  circumferentialStress;
  radialStress;
  constructor(motorChain) {
    this.internalRadius = motorChain
      ? motorChain.internalRadius
        ? motorChain.internalRadius
        : null
      : null;
    this.height = motorChain
      ? motorChain.height
        ? motorChain.height
        : null
      : null;
    this.thickness = motorChain
      ? motorChain.thickness
        ? motorChain.thickness
        : null
      : null;
    this.volume = motorChain
      ? motorChain.volume
        ? motorChain.volume
        : null
      : null;
    this.workPressure = motorChain
      ? motorChain.workPressure
        ? motorChain.workPressure
        : null
      : null;
    this.materialId = motorChain
      ? motorChain.materialId
        ? motorChain.materialId
        : ""
      : "";
    this.admissiveStress = motorChain
      ? motorChain.admissiveStress
        ? motorChain.admissiveStress
        : null
      : null;
    this.longitudinalStress = motorChain
      ? motorChain.longitudinalStress
        ? motorChain.longitudinalStress
        : null
      : null;
    this.circumferentialStress = motorChain
      ? motorChain.circumferentialStress
        ? motorChain.circumferentialStress
        : null
      : null;
    this.radialStress = motorChain
      ? motorChain.radialStress
        ? motorChain.radialStress
        : null
      : null;
  }
}

// Constant

export const MotorChainActionsType = {
  MATERIALS_GETTED: "MATERIALS_GETTED",
  MOTORCHAIN_PROPS_SETTED: "MOTORCHAIN_PROPS_SETTED",
  CALCULASTION_TYPE_SETTED: "CALCULASTION_TYPE_SETTED",
  INTERNAL_RADIUS_SETTED: "INTERNAL_RADIUS_SETTED",
  HEIGHT_SETTED: "HEIGHT_SETTED",
  THICKNESS_SETTED: "THICKNESS_SETTED",
  VOLUME_SETTED: "VOLUME_SETTED",
  WORK_PRESSURE_SETTED: "WORK_PRESSURE_SETTED",
  MATERIAL_SETTED: "MATERIAL_SETTED",
  LONGITUDINAL_STRESS_SETTED: "LONGITUDINAL_STRESS_SETTED",
  CIRCUNFERENTIAL_STRESS_SETTED: "CIRCUNFERENTIAL_STRESS_SETTED",
  RADIAL_STRESS_SETTED: "RADIAL_STRESS_SETTED",
  BUTTON_STATE_SETTED: "BUTTON_STATE_SETTED",
};

export const CalculationTypes = {
  SAFETY_MARGIN: 0,
  THICKNESS: 1,
  MAIN_STRESSES: 2,
};

export const nameTranslations = {
  admissiveStress: "Admissive Stress",
  longitudinalStress: "Longitudinal Stress",
  circumferentialStress: "Circumferential Stress",
  radialStress: "Radial Stress",
  SM: "Safety Margin",
  thickness: "Thicknesss",
  maxStressSupported: "Screw Maximum Stress Supported",
};
