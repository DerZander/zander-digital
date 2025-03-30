import os

# .env nur lokal laden, NICHT im Container
if os.getenv("DOCKERIZED") != "1":
    from dotenv import load_dotenv
    load_dotenv()

FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")
FLASK_PORT = int(os.getenv("FLASK_PORT", 5000))
FLASK_DEBUG = os.getenv("FLASK_DEBUG", False)
FLASK_THREADED = (os
                  .getenv("FLASK_THREADED", True))

RESTPLUS_SWAGGER_EXPANSION = os.getenv("RESTPLUS_SWAGGER_EXPANSION", "list")
RESTPLUS_VAL = os.getenv("RESTPLUS_VALIDATE", True)
RESTPLUS_MASK_SWAGGER = os.getenv("RESTPLUS_MASK_SWAGGER", False)

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173")
SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI", "sqlite:///db.sqlite")
SQLALCHEMY_TRACK_MODS = os.getenv("SQLALCHEMY_TRACK_MODS", False)
