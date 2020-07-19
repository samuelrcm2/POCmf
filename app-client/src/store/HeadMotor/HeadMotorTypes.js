export class ScrewPattern {
  id;
  name;
  pitch;
  minMinorDiameter;
  maxMinorDiameter;
  minMajorDiameter;
  maxMajorDiameter;

  constructor(screwPattern) {
    this.id = screwPattern ? (screwPattern.id ? screwPattern.id : "") : "";
    this.name = screwPattern
      ? screwPattern.name
        ? screwPattern.name
        : ""
      : "";
    this.pitch = screwPattern
      ? screwPattern.pitch
        ? screwPattern.pitch
        : ""
      : "";
    this.minMinorDiameter = screwPattern
      ? screwPattern.minMinorDiameter
        ? screwPattern.minMinorDiameter
        : ""
      : "";
    this.maxMinorDiameter = screwPattern
      ? screwPattern.maxMinorDiameter
        ? screwPattern.maxMinorDiameter
        : ""
      : "";
    this.minMajorDiameter = screwPattern
      ? screwPattern.minMajorDiameter
        ? screwPattern.minMajorDiameter
        : ""
      : "";
    this.maxMajorDiameter = screwPattern
      ? screwPattern.maxMajorDiameter
        ? screwPattern.maxMajorDiameter
        : ""
      : "";
  }
}

export class HeadMotor {
  screwHeight;
  internalHeadHeight;
  externalHeadHeight;
  screwPattern;
  workPressure;
  internalRadius;
  internalMinorRadius;
  thickness;
  afterScrewHeight;
  materialId;

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
    this.workPressure = headMotor
      ? headMotor.workPressure
        ? headMotor.workPressure
        : ""
      : "";
    this.internalRadius = headMotor
      ? headMotor.internalRadius
        ? headMotor.internalRadius
        : ""
      : "";
    this.internalMinorRadius = headMotor
      ? headMotor.internalMinorRadius
        ? headMotor.internalMinorRadius
        : ""
      : "";
    this.thickness = headMotor
      ? headMotor.thickness
        ? headMotor.thickness
        : ""
      : "";
    this.afterScrewHeight = headMotor
      ? headMotor.afterScrewHeight
        ? headMotor.afterScrewHeight
        : ""
      : "";
    this.materialId = headMotor
      ? headMotor.materialId
        ? headMotor.materialId
        : ""
      : "";
  }
}
export const HeadMotorActionsType = {
  SCREW_PATTERN_GETTED: "HM_SCREW_PATTERN_GETTED",
  SCREW_PATTERN_BY_DIAMETER_GETTED: "HM_SCREW_PATTERN_BY_DIAMETER_GETTED",
  SELECT_SCREW_PATTERN_SETTED: "HM_SELECT_SCREW_PATTERN_SETTED",
  EXTERNAL_HEIGHT_SETTED: "HM_EXTERNAL_HEIGHT_SETTED",
  INTERNAL_HEIGHT_SETTED: "HM_INTERNAL_HEIGHT_SETTED",
  INTERNAL_RADIUS_SETTED: "HM_INTERNAL_RADIUS_sETTED",
  INTERNAL_MINOR_RAIDUS_SETTED: "HM_INTERNAL_MINOR_RAIDUS_SETTED",
  THICKNESS_SETTED: "HM_THICKNESS_SETTED",
  SCREW_HEIGHT_SETTED: "HM_SCREW_HEIGHT_SETTED",
  AFTER_SCREW_HEIGHT_SETTED: "HM_AFTER_SCREW_HEIGHT_SETTED",
  SCREW_MAX_STRESS: "HM_SCREW_MAX_STRESS",
  CREATED_PITCH_SCREW_SETTED: "HM_CREATED_PITCH_SCREW_SETTED",
  CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED:
    "HM_CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED",
  CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED:
    "HM_CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED",
  CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED:
    "HM_CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED",
  CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED:
    "HM_CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED",
};
