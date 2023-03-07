from AppEngg import app
from waitress import serve
import logging
logger = logging.getLogger('waitress')
logger.setLevel(logging.INFO)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
