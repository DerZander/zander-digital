from backend.database import BaseModel, db


class Skill(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    xp = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(120), nullable=True)
    since = db.Column(db.Date(), nullable=False)
    is_favorite = db.Column(db.Boolean(), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('skill_category.id'), nullable=False)
