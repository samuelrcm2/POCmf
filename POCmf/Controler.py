from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from Domain import StructDomain
from Domain import MaterialsDomain

app = Flask(__name__)
CORS(app)
api = Api(app)
@app.route('/')
def home():
    return "POCmf is in inicial stage of development"

class MotorChain(Resource):
    def post (self):
        data = request.get_json()
        result = StructDomain.handle_MotorChain_calculation_types(data)
        if data["type_calculation"] == 0:
            return {"SM": result}, 200
        elif data["type_calculation"] == 1:
            return {"Thickness": result}, 200
        elif data["type_calculation"] == 2:
            return result, 200        
    
class AllMaterials(Resource):
    def get (self):
        materials = MaterialsDomain.Materials.get_all_materials()
        if materials:
            return materials, 200
        else:
            return {"message": "No material found"}, 404
        
class MaterialsById(Resource):
    def get (self, Id):
        material = MaterialsDomain.Materials.get_material_by_id(Id)
        if material:
            return material, 200
        else: 
            return {"message": "Material not found"}, 404
    
    
api.add_resource(MotorChain, '/motorChain/')
api.add_resource(AllMaterials, '/materials/getAllMaterials')
api.add_resource(MaterialsById, '/materials/getMaterialById/<int:Id>')

if __name__ == "__main__" :
    app.run(port=5000)