# backend.endpoints.skills.py
from flask_restx import Resource, Namespace

from backend.database.models import Skill

namespace = Namespace('skills', description='Skills related operations')


@namespace.route('/')
class SkillEndpoint(Resource):
    @namespace.response(200, 'Success')
    @namespace.response(500, 'Internal Server Error')
    def get(self):
        try:
            skills = Skill.query.all()
            return [s.as_dict() for s in skills], 200
        except Exception as e:
            return {'error': str(e)}, 500
