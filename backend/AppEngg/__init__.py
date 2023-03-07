from dtale.app import build_app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = build_app(reaper_on=False)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///appeng.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024
app.config['MAX_DF_COUNT'] = 100
db = SQLAlchemy(app)

from AppEngg import routes, code_routes, models
