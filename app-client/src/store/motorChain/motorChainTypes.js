// Classes
export class motorChain {
  radius;
  height;
  thickness;
  volume;
  workPressure;
  materialId;
  admissiveStress;
  longitudinalStress;
}

export class Material {
  id;
  name;
  yeldStrength;
  ultimateStrength;
  density;
}

export class MotorChain {
  radius;
  height;
  thickness;
  volume;
  workPressure;
  materialId;
  admissiveStress;
  longitudinalStress;
  circumferentialStress;

  constructor(motorChain) {
    this.radius = motorChain
      ? motorChain.radius
        ? motorChain.radius
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
  }
}

// Constant

export const MotorChainActionsType = {
  MATERIALS_GETTED: "MATERIALS_GETTED",
  MOTORCHAIN_PROPS_SETTED: "MOTORCHAIN_PROPS_SETTED",
  CALCULASTION_TYPE_SETTED: "CALCULASTION_TYPE_SETTED",
  RADIUS_SETTED: "RADIUS_SETTED",
  HEIGHT_SETTED: "HEIGHT_SETTED",
  THICKNESS_SETTED: "THICKNESS_SETTED",
  VOLUME_SETTED: "VOLUME_SETTED",
  WORK_PRESSURE_SETTED: "WORK_PRESSURE_SETTED",
  MATERIAL_SETTED: "MATERIAL_SETTED",
  ADMISSIVE_STRESS_SETTED: "ADMISSIVE_STRESS_SETTED",
  LONGITUDINAL_STRESS_SETTED: "LONGITUDINAL_STRESS_SETTED",
  CIRCUNFERENTIAL_STRESS_SETTED: "CIRCUNFERENTIAL_STRESS_SETTED",
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
  SM: "Safety Margin",
  thickness: "Thicknesss",
};
