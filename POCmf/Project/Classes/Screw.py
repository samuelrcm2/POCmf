from Project.Infra import ScrewInfra

class Screw:
    def __init__(self, Id, majorDiameter, pitch, tensileStressArea, majorDiamterArea):
        self.id: int = Id
        self.majorDiameter: float = majorDiameter
        self.pitch: float = pitch
        self.tensileStressArea: float = tensileStressArea
        self.majorDiamterArea: float = majorDiamterArea

    @classmethod  
    def getAllScrewPatterns(cls):
        screwPatterns: list = []
        rawScrewPatterns = ScrewInfra.getAllScrewsPatterns()
        for row in rawScrewPatterns:
            aux = cls(*row)
            screwPatterns.append(aux.__dict__)
        return screwPatterns