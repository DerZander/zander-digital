from backend.database.BaseModel import BaseModel
from backend.database.database import db


class AchievementCategory(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    achievements = db.relationship('Achievement', backref='category', lazy=True)
