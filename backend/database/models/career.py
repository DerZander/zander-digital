from backend.database import BaseModel, db


class Career(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    employment_type = db.Column(db.String(50), nullable=False, default="Vollzeit")  # z.B. Vollzeit, Teilzeit, Praktikum, Freelancer, Dualer Student
    work_model = db.Column(db.String(50), nullable=False, default="Vor Ort")  # z.B. Vor Ort, Hybrid, Remote

    # Unternehmensdaten
    company = db.Column(db.String(120), nullable=False)
    company_street = db.Column(db.String(120), nullable=False)
    company_house_number = db.Column(db.String(10), nullable=False)
    company_city = db.Column(db.String(120), nullable=False)
    company_zip = db.Column(db.String(5), nullable=False)
    company_country = db.Column(db.String(120), nullable=False)

    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)

    def __repr__(self):
        return f'<Career {self.name}>'
