from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import StructDomain

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
        
api.add_resource(Thickness, '/thickness/')
if __name__ == "__main__" :
    app.run(port=4200, debug=True)