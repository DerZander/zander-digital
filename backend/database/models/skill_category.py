from backend.database.BaseModel import BaseModel
from backend.database.database import db


class SkillCategory(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    skills = db.relationship('Skill', backref='category', lazy=True)  # Das ist wichtig!
