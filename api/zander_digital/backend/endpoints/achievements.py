from flask_restx import Namespace, Resource

from database.models.achievement import Achievement

namespace = Namespace('achievements', description='Achievements related operations')


@namespace.route('/')
class AchievementsEndpoint(Resource):
    def get(self):
        achievements = Achievement.query.all()
        return [achievement.as_dict() for achievement in achievements]
