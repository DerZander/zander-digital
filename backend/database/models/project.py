from database.BaseModel import BaseModel
from database.database import db

project_skill_association = db.Table(
    'project_skill_association',
    db.Column('project_id', db.Integer, db.ForeignKey('project.id')),
    db.Column('skill_id', db.Integer, db.ForeignKey('skill.id'))
)


class Project(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=True)
    start_date = db.Column(db.Date(), nullable=True)
    end_date = db.Column(db.Date(), nullable=True)

    branch_id = db.Column(db.Integer, db.ForeignKey('branch.id'), nullable=True)

    skills = db.relationship(
        'Skill',
        secondary=project_skill_association,
        backref=db.backref('projects', lazy='select')
    )
