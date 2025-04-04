from datetime import datetime

from backend.database import BaseModel, db


class Bitpet(BaseModel):
    __tablename__ = 'bitpet'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, default="Muffin")
    hunger = db.Column(db.Integer, nullable=False, default=100)
    cleanliness = db.Column(db.Integer, nullable=False, default=100)
    energy = db.Column(db.Integer, nullable=False, default=100)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

    last_feed = db.Column(db.DateTime, nullable=True)
    last_care = db.Column(db.DateTime, nullable=True)
    last_sleep = db.Column(db.DateTime, nullable=True)

    cooldowns = {
        "feed": 60,
        "care": 120,
        "sleep": 180
    }

    def apply_decay(self):
        now = datetime.utcnow()
        elapsed = (now - self.last_updated).total_seconds()

        # Verfallsraten pro Sekunde (negativ!)
        hunger_rate = -1 / 60  # verliert 1 Punkt Hunger pro 60s
        energy_rate = -1 / 90  # verliert 1 Punkt Energie pro 90s
        clean_rate = -1 / 120  # verliert 1 Punkt Sauberkeit pro 120s

        self.hunger = max(0, min(100, self.hunger + int(elapsed * hunger_rate)))
        self.energy = max(0, min(100, self.energy + int(elapsed * energy_rate)))
        self.cleanliness = max(0, min(100, self.cleanliness + int(elapsed * clean_rate)))

        self.last_updated = now

    def get_remaining_cooldown(self, action):
        last_action = {
            "feed": self.last_feed,
            "care": self.last_care,
            "sleep": self.last_sleep
        }.get(action)

        if not last_action:
            return 0
        elapsed = (datetime.utcnow() - last_action).total_seconds()
        return max(0, int(self.cooldowns[action] - elapsed))

    def perform_action(self, action):
        self.apply_decay()

        remaining = self.get_remaining_cooldown(action)
        if remaining > 0:
            raise Exception(f"Cooldown aktiv für '{action}': {remaining}s verbleibend")

        if action == "feed":
            self.hunger = min(100, self.hunger + 20)
            self.last_feed = datetime.utcnow()
        elif action == "care":
            self.cleanliness = min(100, self.cleanliness + 20)
            self.last_care = datetime.utcnow()
        elif action == "sleep":
            self.energy = min(100, self.energy + 30)
            self.last_sleep = datetime.utcnow()

        self.last_updated = datetime.utcnow()

    def as_dict(self):
        self.apply_decay()  # Automatisch verfall aktualisieren

        return {
            "id": self.id,
            "name": self.name,
            "hunger": self.hunger,
            "cleanliness": self.cleanliness,
            "energy": self.energy,
            "last_updated": self.last_updated.isoformat(),
            "cooldowns": {
                "feed": self.get_remaining_cooldown("feed"),
                "care": self.get_remaining_cooldown("care"),
                "sleep": self.get_remaining_cooldown("sleep"),
            }
        }
