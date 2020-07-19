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

export class MotorNozzle {
  screwHeight;
  internalHeight;
  externalHeight;
  screwPattern;
  workPressure;
  internalMajorRadius;
  internalMinorRadius;
  thickness;
  afterScrewHeight;
  materialId;

  constructor(motorNozzle) {
    this.screwHeight = motorNozzle
      ? motorNozzle.screwHeight
        ? motorNozzle.screwHeight
        : ""
      : "";
    this.internalHeight = motorNozzle
      ? motorNozzle.internalHeight
        ? motorNozzle.internalHeight
        : ""
      : "";
    this.externalHeight = motorNozzle
      ? motorNozzle.externalHeadHeight
        ? motorNozzle.externalHeadHeight
        : ""
      : "";
    this.screwPattern = motorNozzle
      ? motorNozzle.screwPattern
        ? motorNozzle.screwPattern
        : new ScrewPattern()
      : new ScrewPattern();
    this.workPressure = motorNozzle
      ? motorNozzle.workPressure
        ? motorNozzle.workPressure
        : ""
      : "";
    this.internalMajorRadius = motorNozzle
      ? motorNozzle.internalMajorRadius
        ? motorNozzle.internalMajorRadius
        : ""
      : "";
    this.internalMinorRadius = motorNozzle
      ? motorNozzle.internalMinorRadius
        ? motorNozzle.internalMinorRadius
        : ""
      : "";
    this.thickness = motorNozzle
      ? motorNozzle.thickness
        ? motorNozzle.thickness
        : ""
      : "";
    this.afterScrewHeight = motorNozzle
      ? motorNozzle.afterScrewHeight
        ? motorNozzle.afterScrewHeight
        : ""
      : "";
    this.materialId = motorNozzle
      ? motorNozzle.materialId
        ? motorNozzle.materialId
        : ""
      : "";
  }
}
export const MotorNozzleActionsType = {
  SCREW_PATTERN_GETTED: "MN_SCREW_PATTERN_GETTED",
  SCREW_PATTERN_BY_DIAMETER_GETTED: "MN_SCREW_PATTERN_BY_DIAMETER_GETTED",
  SELECT_SCREW_PATTERN_SETTED: "MN_SELECT_SCREW_PATTERN_SETTED",
  EXTERNAL_HEIGHT_SETTED: "MN_EXTERNAL_HEIGHT_SETTED",
  INTERNAL_HEIGHT_SETTED: "MN_INTERNAL_HEIGHT_SETTED",
  EXTERNAL_RADIUS_SETTED: "MN_EXTERNAL_RADIUS_SETTED",
  INTERNAL_MAJOR_RADIUS_SETTED: "MN_INTERNAL_MAJOR_RADIUS_SETTED",
  INTERNAL_MINOR_RADIUS_SETTED: "MN_INTERNAL_MINOR_RADIUS_SETTED",
  THICKNESS_SETTED: "MN_THICKNESS_SETTED",
  AFTER_SCREW_HEIGHT_SETTED: "MN_AFTER_SCREW_HEIGHT_SETTED",
  SCREW_HEIGHT_SETTED: "MN_SCREW_HEIGHT_SETTED",
  SCREW_MAX_STRESS: "MN_SCREW_MAX_STRESS",
  CREATED_PITCH_SCREW_SETTED: "MN_CREATED_PITCH_SCREW_SETTED",
  CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED:
    "MN_CREATED_MIN_MINOR_DIAMETER_SCREW_SETTED",
  CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED:
    "MN_CREATED_MAX_MINOR_DIAMETER_SCREW_SETTED",
  CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED:
    "MN_CREATED_MIN_MAJOR_DIAMETER_SCREW_SETTED",
  CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED:
    "MN_CREATED_MAX_MAJOR_DIAMETER_SCREW_SETTED",
};
