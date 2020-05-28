from flask import Flask, request, jsonify, json
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from Project.Domain import MaterialsDomain
from Project.Domain import StructDomain
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
app.config['TRAP_HTTP_EXCEPTIONS']=True
app.config['PROPAGATE_EXCEPTIONS'] =True
CORS(app) 
api = Api(app)

@app.errorhandler(Exception)
@cross_origin()
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
        # try:
        result = StructDomain.handleMotorChainCalculationTypes(data['motorChain'], data['calculationType'])
        # except Exception as ex:
        #     template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        #     message = template.format(type(ex).__name__, ex.args)
        #     return message, 400
        if result:
            return result, 202      
    
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
    app.run(port=5000, Debug=True)