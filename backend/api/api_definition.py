from api.backend_api import api
from flask_restx import fields

skill_category = api.model('SkillCategory', {
    "id": fields.Integer(required=True, description='The skill category identifier'),
    "name": fields.String(required=True, description='The skill category name')
})

skill = api.model('Skill', {
    "id": fields.Integer(required=True, description='The skill identifier'),
    "name": fields.String(required=True, description='The skill name'),
    "xp": fields.Integer(required=True, description='The skill experience points'),
    "description": fields.String(required=False, description='The skill description'),
    "since": fields.Date(required=True, description='The skill since date'),
    "is_favorite": fields.Boolean(required=True, description='The skill is favorite'),
    "category_id": fields.Integer(required=True, description='The skill category identifier')
})

pagination = api.model('One page of Items', {
    'page': fields.Integer(required=True, description='The page number'),
    'pages': fields.Integer(required=True, description='The total number of pages'),
    'per_page': fields.Integer(required=True, description='The number of items per page'),
    'total': fields.Integer(required=True, description='The total number of items')
})

page_with_skills = api.inherit('PageWithSkills', pagination, {
    'items': fields.List(fields.Nested(skill))
})
