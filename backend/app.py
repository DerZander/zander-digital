from flask import Flask, Blueprint
from flask_cors import CORS

import settings
from database import db

flask_app = Flask(__name__)


def configure_app(app):
    """
    Konfiguriert die Flask-Anwendung.

    - Aktiviert CORS (Cross-Origin Resource Sharing) mit den angegebenen Ursprüngen.
    - Setzt die SQLAlchemy-Datenbank-URI und deaktiviert die Verfolgung von Modifikationen.

    Args:
        app (Flask): Die Flask-Anwendung, die konfiguriert werden soll.
    """
    CORS(app, origins=[settings.CORS_ORIGINS, "http://localhost:5173"])
    app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODS


def init_app(app):
    """
    Initialisiert die Flask-Anwendung.

    - Konfiguriert die Anwendung.
    - Initialisiert die Datenbankerweiterung.
    - Registriert Blueprints und Namespaces für die API-Endpunkte.

    Args:
        app (Flask): Die Flask-Anwendung, die initialisiert werden soll.
    """
    configure_app(app)
    db.init_app(app)

    # Importiert die API und Namespaces
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

    # Erstellt und registriert den API-Blueprint
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
    """
    Hauptfunktion der Anwendung.

    - Initialisiert die Flask-Anwendung.
    - Erstellt die Datenbanktabellen, falls sie nicht existieren.
    - Startet den Flask-Server mit den in den Einstellungen definierten Parametern.
    """
    init_app(flask_app)
    with flask_app.app_context():
        db.create_all()
    flask_app.run(
        host=settings.FLASK_HOST,
        port=settings.FLASK_PORT,
        debug=settings.FLASK_DEBUG,
        threaded=settings.FLASK_THREADED
    )


if __name__ == "__main__":
    main()
