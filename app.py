# app.py
from flask import Flask, Blueprint
from flask_cors import CORS

import settings
from api.backend_api import api
from api.zander_digital.backend.endpoints.achievements import namespace as achievement_namespace
from api.zander_digital.backend.endpoints.earworms import namespace as earworm_namespace
from api.zander_digital.backend.endpoints.skills import namespace as skill_namespace
from database.database import db

flask_app = Flask(__name__)


def configure_app(app):
    CORS(app, origins=settings.CORS_ORIGINS)
    app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_EXPANSION
    app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VAL
    app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODS


def init_app(app):
    configure_app(app)
    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)
    api.add_namespace(skill_namespace)
    api.add_namespace(earworm_namespace)
    api.add_namespace(achievement_namespace)
    app.register_blueprint(blueprint)
    db.init_app(app)


def main():
    init_app(flask_app)
    flask_app.run(debug=settings.FLASK_DEBUG, threaded=settings.FLASK_THREADED)


if __name__ == "__main__":
    main()
