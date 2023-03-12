from dtale.app import build_app
from flask_cors import CORS

app = build_app(reaper_on=False)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024
app.config['MAX_DF_COUNT'] = 100

from AppEngg import routes, code_routes
