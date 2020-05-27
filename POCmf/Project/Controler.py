from flask import Flask, request, jsonify, json
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from Project.Domain import MaterialsDomain
from Project.Domain import StructDomain
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
CORS(app)
api = Api(app)
@app.route('/')
def home():
    return "POCmf is in inicial stage of development"

@app.errorhandler(ZeroDivisionError)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

class MotorChain(Resource):
    def post (self):
        data = request.get_json()
        try:
            result = StructDomain.handleMotorChainCalculationTypes(data['motorChain'], data['calculationType'])
        except Exception:
            return {"message": Exception.args}, 500
        return result, 200        
    
class AllMaterials(Resource):
    def get (self):
        materials = MaterialsDomain.Materials.getAllMaterials()
        if materials:
            return materials, 200
        else:
            return {"message": "No material found"}, 404
        
class MaterialsById(Resource):
    def get (self, Id):
        material = MaterialsDomain.Materials.getMaterialById(Id)
        if material:
            return material, 200
        else: 
            return {"message": "Material not found"}, 404
    
    
api.add_resource(MotorChain, '/motorChain/')
api.add_resource(AllMaterials, '/materials/getAllMaterials')
api.add_resource(MaterialsById, '/materials/getMaterialById/<int:Id>')

if __name__ == "__main__" :
    app.run(port=5000, debug=True)