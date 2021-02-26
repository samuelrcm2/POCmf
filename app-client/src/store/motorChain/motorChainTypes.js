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
  hasAditionalHeatStress;
  temperatureVariation;
  constructor(motorChain) {
    this.internalRadius = motorChain
      ? motorChain.internalRadius
        ? motorChain.internalRadius
        : 20
      : 20;
    this.height = motorChain
      ? motorChain.height
        ? motorChain.height
        : 200
      : 200;
    this.thickness = motorChain
      ? motorChain.thickness
        ? motorChain.thickness
        : 5
      : 5;
    this.volume = motorChain
      ? motorChain.volume
        ? motorChain.volume
        : null
      : null;
    this.workPressure = motorChain
      ? motorChain.workPressure
        ? motorChain.workPressure
        : 40
      : 40;
    this.materialId = motorChain
      ? motorChain.materialId
        ? motorChain.materialId
        : 1
      : 1;
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
    this.hasAditionalHeatStress = false;
    this.temperatureVariation = motorChain
    ? motorChain.temperatureVariation
      ? motorChain.temperatureVariation
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
  TEMPERATURE_VARIATION_SETTED: "TEMPERATURE_VARIATION_SETTED",
  HAS_ADDITIONAL_STRESS_SETTED: "HAS_ADDITIONAL_STRESS_SETTED",
  BUTTON_STATE_SETTED: "BUTTON_STATE_SETTED",
};

export const CalculationTypes = {
  SAFETY_MARGIN: 0,
  THICKNESS: 1,
};