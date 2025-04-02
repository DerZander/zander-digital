from backend.database.BaseModel import BaseModel
from backend.database.database import db


class Education(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    school = db.Column(db.String(255), nullable=False)  # z. B. "FOM Düsseldorf"
    degree = db.Column(db.String(255), nullable=False)  # z. B. "B.Sc. in Wirtschaftsinformatik"
    field_of_study = db.Column(db.String(255), nullable=True)  # z. B. "Wirtschaft"
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    activities = db.Column(db.String(255), nullable=True)  # z. B. "Thesis Titel: ..."
    description = db.Column(db.String(512), nullable=True)  # längere Beschreibung
