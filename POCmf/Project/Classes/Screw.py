from Project.Infra import ScrewInfra

class Screw:
    def __init__(self, Id, name , pitch, minMinorDiameter,maxMinorDiameter,minMajorDiameter, maxMajorDiameter):
        self.id: int = Id
        self.name: str = name
        self.pitch: float = pitch
        self.minMinorDiameter: float = minMinorDiameter
        self.maxMinorDiameter: float = maxMinorDiameter
        self.minMajorDiameter: float = minMajorDiameter
        self.maxMajorDiameter: float = maxMajorDiameter

    @classmethod  
    def getAllScrewPatterns(cls):
        screwPatterns: list = []
        rawScrewPatterns = ScrewInfra.getAllScrewsPatterns()
        for row in rawScrewPatterns:
            aux = cls(*row)
            screwPatterns.append(aux.__dict__)
        return screwPatterns

    @classmethod
    def getScrewsPatternsByDiameter(cls, internalDiameter, externalDiameter):
        screwPatterns: list = []
        rawScrewPatterns = ScrewInfra.getScrewsPatternsByDiameter(internalDiameter, externalDiameter)
        if rawScrewPatterns:
            for row in rawScrewPatterns:
                aux = cls(*row)
                screwPatterns.append(aux.__dict__)
        else:
            screwPatterns = None
        return screwPatterns

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "pitch": self.pitch,
            "minMinorDiameter": self.minMinorDiameter,
            "maxMinorDiameter": self.maxMinorDiameter,
            "minMajorDiameter": self.minMajorDiameter,
            "maxMajorDiameter": self.maxMajorDiameter,
        }