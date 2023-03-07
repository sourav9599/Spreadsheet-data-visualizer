from AppEngg import db


class Usage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    tokens = db.Column(db.Integer, nullable=False)

    def __int__(self, date, tokens):
        self.date = date
        self.tokens = tokens
