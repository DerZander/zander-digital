from datetime import datetime

from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, origins=["https://zander.digital", "http://localhost:5173"])
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://TnDD3Djmg4EG7YvFjvG:Q91PRyp8ScCwuS4Qa1jN4Swm9dgzMwcaEY3ptsBdF@zander.digital:3306/zander.digital'  # Oder später anpassen auf MySQL/PostgreSQL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


#
# class Project(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), nullable=False)
#     description = db.Column(db.String(120), nullable=True)
#     date = db.Column(db.Date(), nullable=False)
#     branch_id = db.Column(db.Integer, db.ForeignKey('branch.id'), nullable=False)

class Earworms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    spotify_id = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    date = db.Column(db.Date(), nullable=False, default=datetime.now())


class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=True)
    date = db.Column(db.Date(), nullable=False)
    branch_id = db.Column(db.Integer, db.ForeignKey('branch.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('achievement_category.id'), nullable=False)


class Branch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    achievements = db.relationship('Achievement', backref='branch', lazy=True)  # Das ist wichtig!


class AchievementCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    achievements = db.relationship('Achievement', backref='category', lazy=True)  # Das ist wichtig!


class SkillCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    skills = db.relationship('Skill', backref='category', lazy=True)  # Das ist wichtig!


class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    xp = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(120), nullable=True)
    since = db.Column(db.Date(), nullable=False)
    is_favorite = db.Column(db.Boolean(), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('skill_category.id'), nullable=False)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/api/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    output = []
    for skill in skills:
        output.append({
            'id': skill.id,
            'name': skill.name,
            'xp': skill.xp,
            'description': skill.description,
            'since': skill.since.strftime("%b %Y") if skill.since else None,
            'is_favorite': skill.is_favorite,
            'category': {
                'id': skill.category.id,
                'name': skill.category.name
            } if skill.category else None
        })
    return jsonify(output)


@app.route('/api/earworms/active', methods=['GET'])
def get_active_earworms():
    earworms = Earworms.query.all()
    output = []
    for earworm in earworms:
        if earworm.is_active:
            output.append({
                'id': earworm.id,
                'name': earworm.name,
                'spotify_id': earworm.spotify_id,
                'is_active': earworm.is_active,
                'date': earworm.date.strftime("%b %Y") if earworm.date else None
            })
    return jsonify(output)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
