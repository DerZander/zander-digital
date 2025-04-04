from flask_restx import Namespace, Resource, fields

from backend.database.models import Achievement

namespace = Namespace('achievements', description='Achievements related operations')

error_model = namespace.model('Error', {
    'error': fields.String(description='Fehlermeldung')
})


@namespace.route('/')
class AchievementEndpoint(Resource):
    @namespace.response(200, 'Success')
    @namespace.response(400, 'Bad Request', model=error_model)
    @namespace.response(500, 'Internal Server Error')
    def get(self):
        try:
            achievements = Achievement.query.all()
            if not achievements:
                return {"message": "No achievements found"}, 404
            achievements_list = sorted(
                [a.as_dict() for a in achievements],
                key=lambda x: x['date'],
                reverse=False  # oder True für absteigend
            )

            return achievements_list, 200
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            return {"error": "Internal Server Error"}, 500
