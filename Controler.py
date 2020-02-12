from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from Domain import StructDomain
from Domain import MaterialsDomain

app = Flask(__name__)
api = Api(app)
@app.route('/')
def home():
    return "POCmf is in inicial stage of development"

class Thickness(Resource):
    def post (self):
        data = request.get_json()
        calculated_thickness = StructDomain.handle_MotorChain_calculation_types(data)
        return calculated_thickness, 200
    
class MaterialsControler(Resource):
    def get (self):
        materials = MaterialsDomain.Materials.get_all_materials()
        return materials, 200
        
api.add_resource(Thickness, '/thickness/')
api.add_resource(MaterialsControler, '/materials/')

if __name__ == "__main__" :
    app.run(port=5000)