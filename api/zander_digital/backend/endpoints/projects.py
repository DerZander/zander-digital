import logging

from flask_restx import Resource, Namespace

from database.models.project import Project

namespace = Namespace('projects', description='Project related operations')

logger = logging.getLogger(__name__)


@namespace.route('/')
class ProjectEndpoint(Resource):
    # def get(self):
    #     try:
    #         projects = Project.query.all()
    #         logger.info(f"Found {len(projects)} projects.")
    #         data = [p.as_dict() for p in projects]
    #         return data
    #     except Exception as e:
    #         logger.exception("Fehler beim Abrufen der Projekte")
    #         return {"error": str(e)}, 500
    def get(self):
        projects = Project.query.all()
        return [project.as_dict() for project in projects]
