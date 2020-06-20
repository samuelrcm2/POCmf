export class ScrewPattern {
  id;
  name;
  pitch;
  minMinorDiameter;
  maxMinorDiameter;
  minMajorDiameter;
  maxMajorDiameter;

  constructor(screwpattern) {
    this.id = screwpattern ? (screwpattern.id ? screwpattern.id : "") : "";
    this.name = screwpattern
      ? screwpattern.name
        ? screwpattern.name
        : ""
      : "";
    this.pitch = screwpattern
      ? screwpattern.pitch
        ? screwpattern.pitch
        : ""
      : "";
    this.minMinorDiameter = screwpattern
      ? screwpattern.minMinorDiameter
        ? screwpattern.minMinorDiameter
        : ""
      : "";
    this.maxMinorDiameter = screwpattern
      ? screwpattern.maxMinorDiameter
        ? screwpattern.maxMinorDiameter
        : ""
      : "";
    this.minMajorDiameter = screwpattern
      ? screwpattern.minMajorDiameter
        ? screwpattern.minMajorDiameter
        : ""
      : "";
    this.maxMajorDiameter = screwpattern
      ? screwpattern.maxMajorDiameter
        ? screwpattern.maxMajorDiameter
        : ""
      : "";
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
        : ""
      : "";
    this.internalHeadHeight = headMotor
      ? headMotor.internalHeadHeight
        ? headMotor.internalHeadHeight
        : ""
      : "";
    this.externalHeadHeight = headMotor
      ? headMotor.externalHeadHeight
        ? headMotor.externalHeadHeight
        : ""
      : "";
    this.screwPattern = headMotor
      ? headMotor.screwPattern
        ? headMotor.screwPattern
        : new ScrewPattern()
      : new ScrewPattern();
  }
}
export const HeadMotorActionsType = {
  SCREW_PATTERN_GETTED: "SCREW_PATTERN_GETTED",
  SCREW_PATTERN_BY_DIAMETER_GETTED: "SCREW_PATTERN_BY_DIAMETER_GETTED",
  SELECT_SCREW_PATTERN_SETTED: "SELECT_SCREW_PATTERN_SETTED",
  EXTERNAL_HEIGHT_SETTED: "EXTERNAL_HEIGHT_SETTED",
  INTERNAL_HEIGHT_SETTED: "INTERNAL_HEIGHT_SETTED",
  SCREW_HEIGHT_SETTED: "SCREW_HEIGHT_SETTED",
  SCREW_MAX_STRESS: "SCREW_MAX_STRESS",
  CREATED_PITCH_SCREW_SETTED: "CREATED_PITCH_SCREW_SETTED",
  CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED:
    "CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED",
  CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED:
    "CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED",
  CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED:
    "CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED",
  CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED:
    "CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED",
};
