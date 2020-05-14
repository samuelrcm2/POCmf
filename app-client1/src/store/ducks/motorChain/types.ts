// Actions types
export enum RepositoriesTypes {
  LOAD_REQUEST = "@motorChain/LOAD_REQUEST",
  LOAD_SUCCES = "@motorChain/LOAD_SUCCES",
  LOAD_FAILURE = "@motorChain/LOAD_FAILURE",
  MATERIALS_GETTED = "@motorChain/MATERIALS_GETTED",
}

export interface motorChain {
  radius: number;
  height: number;
  thickness: number;
  volume: number;
  work_pressure: number;
  material_id: number;
  admissive_stress: number;
  longitudinal_stress: number;
}

export interface Material {
  id: number;
  name: string;
  yeld_strength: number;
  ultimate_strength: number;
  density: number;
}

export class MotorChain implements motorChain {
  public radius: number;
  public height: number;
  public thickness: number;
  public volume: number;
  public work_pressure: number;
  public material_id: number;
  public admissive_stress: number;
  public longitudinal_stress: number;

  constructor();
  constructor(motorChain?: motorChain) {
    this.radius = motorChain ? (motorChain.radius ? motorChain.radius : 0) : 0;
    this.height = motorChain ? (motorChain.height ? motorChain.height : 0) : 0;
    this.thickness = motorChain
      ? motorChain.thickness
        ? motorChain.thickness
        : 0
      : 0;
    this.volume = motorChain ? (motorChain.volume ? motorChain.volume : 0) : 0;
    this.work_pressure = motorChain
      ? motorChain.work_pressure
        ? motorChain.work_pressure
        : 0
      : 0;
    this.material_id = motorChain
      ? motorChain.material_id
        ? motorChain.material_id
        : 0
      : 0;
    this.admissive_stress = motorChain
      ? motorChain.admissive_stress
        ? motorChain.admissive_stress
        : 0
      : 0;
    this.longitudinal_stress = motorChain
      ? motorChain.longitudinal_stress
        ? motorChain.longitudinal_stress
        : 0
      : 0;
  }
}
export interface MotorChainState {
  readonly motorChain: motorChain;
  readonly loading: boolean;
  readonly error: boolean;
  readonly allMaterials: Material[];
}
