from database.BaseModel import BaseModel
from database.database import db


class Branch(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    achievements = db.relationship('Achievement', backref='branch', lazy=True)  # Das ist wichtig!


class AchievementCategory(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    achievements = db.relationship('Achievement', backref='category', lazy=True)  # Das ist wichtig!


class Achievement(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=True)
    date = db.Column(db.Date(), nullable=False)
    branch_id = db.Column(db.Integer, db.ForeignKey('branch.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('achievement_category.id'), nullable=False)
