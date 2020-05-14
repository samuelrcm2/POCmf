// Actions types
export class motorChain {
  radius;
  height;
  thickness;
  volume;
  work_pressure;
  material_id;
  admissive_stress;
  longitudinal_stress;
}

export class Material {
  id;
  name;
  yeld_strength;
  ultimate_strength;
  density;
}

export class MotorChain {
  radius;
  height;
  thickness;
  volume;
  work_pressure;
  material_id;
  admissive_stress;
  longitudinal_stress;

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
    this.work_pressure = motorChain
      ? motorChain.work_pressure
        ? motorChain.work_pressure
        : null
      : null;
    this.material_id = motorChain
      ? motorChain.material_id
        ? motorChain.material_id
        : ""
      : "";
    this.admissive_stress = motorChain
      ? motorChain.admissive_stress
        ? motorChain.admissive_stress
        : null
      : null;
    this.longitudinal_stress = motorChain
      ? motorChain.longitudinal_stress
        ? motorChain.longitudinal_stress
        : null
      : null;
  }
}

export const CalculationTypes = {
  SAFETY_MARGIN: 1,
  THICKNESS: 2,
  MAIN_STRESSES: 3,
};
