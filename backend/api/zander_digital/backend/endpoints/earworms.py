from database.models import Earworm
from flask_restx import Resource, Namespace

namespace = Namespace('earworms', description='Earworms related operations')


@namespace.route('/')
class EarwormsEndpoint(Resource):
    def get(self):
        earworms = Earworm.query.all()
        return [earworm.as_dict() for earworm in earworms]


@namespace.route('/active')
class EarwormsActiveEndpoint(Resource):
    def get(self):
        earworms = Earworm.query.filter_by(is_active=True).all()
        return [earworm.as_dict() for earworm in earworms]
