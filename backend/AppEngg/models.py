from AppEngg import db


class Usage(db.Model):
    user_id = db.Column(db.Text, primary_key=True)
    timestamp = db.Column(db.DateTime, nullable=False)
    tokens = db.Column(db.Integer, nullable=False)

