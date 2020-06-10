from flask import Flask, request, jsonify, json
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from Project.Domain import MaterialsDomain
from Project.Domain import StructDomain
from Project.Domain import ScrewDomain
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
app.config['TRAP_HTTP_EXCEPTIONS'] = True
app.config['PROPAGATE_EXCEPTIONS'] = True

CORS(app) 
api = Api(app)

@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return e
    response = {
        "message": e.args[0],
        "status": 400,
    }
    return response, 400
    
@app.route('/')
def home():
    return "POCmf is in inicial stage of development"

class MotorChain(Resource):
    def post (self):
        data = request.get_json()
        result = StructDomain.handleMotorChainCalculationTypes(data['motorChain'], data['calculationType'])
        if result:
            return result, 200      
    
class AllMaterials(Resource):
    def get (self):
        materials = MaterialsDomain.getAllMaterials()
        if materials:
            return materials, 200
        else:
            return {"message": "No material found"}, 404
        
class MaterialsById(Resource):
    def get (self, Id):
        material = MaterialsDomain.getMaterialById(Id)
        if material:
            return material, 200
        else: 
            return {"message": "Material not found"}, 404
    
class AllScrewPatterns(Resource):
    def get(self):
        screwPatterns = ScrewDomain.getAllScrewPatterns()
        return screwPatterns, 200

api.add_resource(MotorChain, '/motorChain/')
api.add_resource(AllMaterials, '/materials/getAllMaterials')
api.add_resource(MaterialsById, '/materials/getMaterialById/<int:Id>')
api.add_resource(AllScrewPatterns, '/screPatterns/')

if __name__ == "__main__" :
    app.run(port=5000, Debug=True)