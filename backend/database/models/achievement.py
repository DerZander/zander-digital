from backend.database.BaseModel import BaseModel
from backend.database.database import db


class Achievement(BaseModel):
    __tablename__ = 'achievement'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=True)
    date = db.Column(db.Date(), nullable=False)
    branch_id = db.Column(db.Integer, db.ForeignKey('branch.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('achievement_category.id'), nullable=False)
