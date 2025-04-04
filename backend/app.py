from flask import Flask, Blueprint
from flask_cors import CORS

import settings
from backend.database import db

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
    from api.endpoints import (
        achievement_namespace,
        bitpet_namespace,
        branch_namespace,
        career_namespace,
        earworm_namespace,
        education_namespace,
        project_namespace,
        skill_namespace,
    )

    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)
    for ns in [
        achievement_namespace,
        bitpet_namespace,
        branch_namespace,
        career_namespace,
        earworm_namespace,
        education_namespace,
        project_namespace,
        skill_namespace,
    ]:
        api.add_namespace(ns)
    app.register_blueprint(blueprint)


def main():
    init_app(flask_app)
    with flask_app.app_context():
        db.create_all()  # <-- Tabellen werden direkt erzeugt
    flask_app.run(host=settings.FLASK_HOST, port=settings.FLASK_PORT, debug=settings.FLASK_DEBUG, threaded=settings.FLASK_THREADED)


if __name__ == "__main__":
    main()
