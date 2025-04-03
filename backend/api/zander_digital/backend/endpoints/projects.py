import logging

from database.models import Project
from flask_restx import Resource, Namespace

namespace = Namespace('projects', description='Project related operations')

logger = logging.getLogger(__name__)


@namespace.route('/')
class ProjectEndpoint(Resource):
    @namespace.response(200, 'Success')
    @namespace.response(500, 'Internal Server Error')
    def get(self):
        projects = Project.query.all()
        return [project.as_dict() for project in projects]
