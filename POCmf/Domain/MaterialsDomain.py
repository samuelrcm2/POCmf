from Infra import MaterialInfra

class Materials:
    def __init__(self, Id, name, yeldStrength, ultimateStrength, density):
        self.id: int = Id
        self.name: str = name
        self.yeldStrength: float = yeldStrength
        self.ultimateStrength: float = ultimateStrength
        self.density: float = density
        
    @classmethod  
    def getAllMaterials(cls):
        materials: list = []
        rawMaterials = MaterialInfra.getAllMaterials()
        for row in rawMaterials:
            aux = cls(*row)
            materials.append(aux.__dict__)
        return materials
    
    @classmethod
    def getMaterialById(cls, Id):
        rawMaterial = MaterialInfra.getMaterialById(Id)
        if rawMaterial:
            aux = cls(*rawMaterial)
            material = (aux.__dict__)
        else:
            material = None
        return material
        

