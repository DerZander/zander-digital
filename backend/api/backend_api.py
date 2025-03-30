from flask_restx import Api

api = Api(
    title='Zander.Digital API',
    version='1.0',
    description='REST API for Zander.Digital'
)

@api.errorhandler
def std_handler(e):
    return {'message': e}, 500