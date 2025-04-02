from flask import Flask, Blueprint
from flask_cors import CORS

import settings
from backend.database.database import db

flask_app = Flask(__name__)


def configure_app(app):
    CORS(app, origins=[settings.CORS_ORIGINS, "http://localhost:5173"])
    app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODS


def init_app(app):
    configure_app(app)
    db.init_app(app)

    # Blueprints und Namespaces
    from api.backend_api import api
    from api.zander_digital.backend.endpoints.achievements import namespace as achievement_namespace
    from api.zander_digital.backend.endpoints.earworms import namespace as earworm_namespace
    from api.zander_digital.backend.endpoints.projects import namespace as project_namespace
    from api.zander_digital.backend.endpoints.skills import namespace as skill_namespace
    from api.zander_digital.backend.endpoints.education import namespace as education_namespace
    from api.zander_digital.backend.endpoints.bitpet import namespace as bitpet_namespace
    from api.zander_digital.backend.endpoints.branches import namespace as branch_namespace

    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)
    api.add_namespace(skill_namespace)
    api.add_namespace(earworm_namespace)
    api.add_namespace(achievement_namespace)
    api.add_namespace(education_namespace)
    api.add_namespace(branch_namespace)
    api.add_namespace(project_namespace)
    api.add_namespace(bitpet_namespace)
    app.register_blueprint(blueprint)


def main():
    init_app(flask_app)
    with flask_app.app_context():
        db.create_all()  # <-- Tabellen werden direkt erzeugt
    flask_app.run(host=settings.FLASK_HOST, port=settings.FLASK_PORT, debug=settings.FLASK_DEBUG, threaded=settings.FLASK_THREADED)


if __name__ == "__main__":
    main()
