# backend.endpoints.skills.py
from flask_restx import Resource, Namespace

from database.models.skill import Skill

namespace = Namespace('skills', description='Skills related operations')


@namespace.route('/')
class SkillEndpoint(Resource):
    def get(self):
        skills = Skill.query.all()
        return [skill.as_dict() for skill in skills]
