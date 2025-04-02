from flask_restx import Namespace, Resource, reqparse

from backend.database.database import db
from backend.database.models.bitpet import Bitpet

namespace = Namespace('bitpet', description='Interaktion mit dem Bitpet')

action_parser = reqparse.RequestParser()
action_parser.add_argument('action', type=str, required=True, help='Action: feed, care, sleep')


@namespace.route('/')
class BitpetEndpoint(Resource):
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Not Found')
    @namespace.response(400, 'Bad Request')
    def get(self):
        try:
            pet = Bitpet.query.first()
            if not pet:
                pet = Bitpet()
                db.session.add(pet)
                db.session.commit()
            return pet.as_dict()
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        args = action_parser.parse_args()
        pet = Bitpet.query.first()
        if not pet:
            return {"error": "Kein Bitpet gefunden"}, 404
        action = args['action'].lower()
        if action not in ["feed", "care", "sleep"]:
            return {"error": "Ungültige Aktion"}, 400
        try:
            pet.perform_action(action)
            db.session.commit()
            return pet.as_dict()
        except Exception as e:
            return {"error": str(e)}, 400
