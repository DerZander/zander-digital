from database.models import Branch
from flask_restx import Namespace, Resource

namespace = Namespace("branches", description="Branches related operations")


@namespace.route("/")
class BranchesEndpoint(Resource):
    def get(self):
        branches = Branch.query.all()
        return [branch.as_dict() for branch in branches], 200
