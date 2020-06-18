export class ScrewPattern {
  id;
  name;
  pitch;
  minMinorDiameter;
  maxMinorDiameter;
  minMajorDiameter;
  maxMajorDiameter;

  constructor(screwpattern) {
    this.id = screwpattern ? (screwpattern.id ? screwpattern.id : null) : null;
    this.name = screwpattern
      ? screwpattern.name
        ? screwpattern.name
        : null
      : null;
    this.pitch = screwpattern
      ? screwpattern.pitch
        ? screwpattern.pitch
        : null
      : null;
    this.minMinorDiameter = screwpattern
      ? screwpattern.minMinorDiameter
        ? screwpattern.minMinorDiameter
        : null
      : null;
    this.maxMinorDiameter = screwpattern
      ? screwpattern.maxMinorDiameter
        ? screwpattern.maxMinorDiameter
        : null
      : null;
    this.minMajorDiameter = screwpattern
      ? screwpattern.minMajorDiameter
        ? screwpattern.minMajorDiameter
        : null
      : null;
    this.maxMajorDiameter = screwpattern
      ? screwpattern.maxMajorDiameter
        ? screwpattern.maxMajorDiameter
        : null
      : null;
  }
}

export class HeadMotor {
  screwHeight;
  internalHeadHeight;
  externalHeadHeight;
  screwPattern;

  constructor(headMotor) {
    this.screwHeight = headMotor
      ? headMotor.screwHeight
        ? headMotor.screwHeight
        : null
      : null;
    this.internalHeadHeight = headMotor
      ? headMotor.internalHeadHeight
        ? headMotor.internalHeadHeight
        : null
      : null;
    this.externalHeadHeight = headMotor
      ? headMotor.externalHeadHeight
        ? headMotor.externalHeadHeight
        : null
      : null;
    this.screwPattern = headMotor
      ? headMotor.screwPattern
        ? headMotor.screwPattern
        : new ScrewPattern()
      : new ScrewPattern();
  }
}
export const HeadMotorctionsType = {
  SCREW_PATTERN_GETTED: "SCREW_PATTERN_GETTED",
  SELECT_SCREW_PATTERN_SETTED: "SELECT_SCREW_PATTERN_SETTED",
  EXTERNAL_HEIGHT_SETTED: "EXTERNAL_HEIGHT_SETTED",
  INTERNAL_HEIGHT_SETTED: "INTERNAL_HEIGHT_SETTED",
  SCREW_HEIGHT_SETTED: "SCREW_HEIGHT_SETTED",
  SCREW_MAX_STRESS: "SCREW_MAX_STRESS",
};
