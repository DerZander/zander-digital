from flask_restx import Resource, Namespace

from backend.database.models import Career

namespace = Namespace('career', description='Career related operations')


@namespace.route('/')
class CareerEndpoint(Resource):
    def get(self):
        careers = Career.query.all()
        return [career.as_dict() for career in careers]
