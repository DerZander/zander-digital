from datetime import datetime

from database.BaseModel import BaseModel
from database.database import db


class Earworm(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    spotify_id = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    date = db.Column(db.Date(), nullable=False, default=datetime.now())
