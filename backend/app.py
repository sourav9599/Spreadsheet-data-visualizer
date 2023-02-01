from flask import Flask

app = Flask(__name__)

# enable debugging mode
app.config["DEBUG"] = True

# Upload folder
# UPLOAD_FOLDER = 'files'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
