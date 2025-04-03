from database.BaseModel import BaseModel
from database.database import db


class Branch(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    achievements = db.relationship('Achievement', backref='branch', lazy=True)
    projects = db.relationship('Project', backref='branch', lazy=True)
