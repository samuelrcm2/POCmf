from Infra import MaterialInfra

class Materials:
    def __init__(self, Id, name, yeld_stregth, ultimate_strength, density):
        self.id: int = Id
        self.name: str = name
        self.yeld_Strength: float = yeld_stregth
        self.ultimate_strength: float = ultimate_strength
        self.density: float = density
        
    @classmethod  
    def get_all_materials(cls):
        materials: list = []
        raw_materials = MaterialInfra.get_all_materials()
        for row in raw_materials:
            aux = cls(*row)
            materials.append(aux.__dict__)
        return materials

