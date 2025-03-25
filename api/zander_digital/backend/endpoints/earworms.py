from flask_restx import Resource, Namespace

from database.models.earworm import Earworms

namespace = Namespace('earworms', description='Earworms related operations')


@namespace.route('/')
class EarwormsEndpoint(Resource):
    def get(self):
        earworms = Earworms.query.all()
        return [earworm.as_dict() for earworm in earworms]


@namespace.route('/active')
class EarwormsActiveEndpoint(Resource):
    def get(self):
        earworms = Earworms.query.filter_by(is_active=True).all()
        return [earworm.as_dict() for earworm in earworms]
