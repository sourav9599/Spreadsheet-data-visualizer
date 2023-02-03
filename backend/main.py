import io
import pandas as pd
from app import app
from flask import request, jsonify

ALLOWED_EXTENSIONS = {'txt', 'csv', 'xlsx'}

dataframes = {}


# session_opts = {
#     'session.type': 'file',
#     'session.cookie_expires': 300,
#     'session.data_dir': './files',
#     'session.auto': True
# }

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# @app.route('/login', methods=['POST'])
# def login():
#     user = request.json.get('user')
#     # Generate a unique token for each user
#     token = str(uuid.uuid4())
#     # Save user data in the sessions dictionary
#     sessions[token] = {'user': user}
#     return jsonify({'token': token})


@app.route("/data-head")
def data():
    # session = request.environ['beaker.session']
    session_id = request.cookies.get("session_id") if request.cookies.get("session_id") else ""
    if f"{session_id}_original" in dataframes and f"{session_id}_modified" in dataframes:
        original = dataframes[f"{session_id}_original"]
        modified = original.head()
        dataframes[f"{session_id}_modified"] = modified
        return jsonify(modified.to_dict(orient="records"))

    else:
        resp = jsonify({'message': 'File not found. Please re-upload.'})
        resp.status_code = 400
        return resp


# @app.route("/data-plot")
# def plot_dataframe(session_id):
#     df = dataframes.get(session_id)
#     if df is not None:
#         fig = Figure()
#         ax = fig.add_subplot(111)
#         df.plot(kind="line", ax=ax)
#         canvas = FigureCanvas(fig)
#         output = io.BytesIO()
#         canvas.print_png(output)
#         return output.getvalue(), 200, {"Content-Type": "image/png"}
#     return "Dataframe not found"


@app.route('/file-upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # session = request.environ['beaker.session']
        # if 'files' not in session:
        #     session['files'] = []
        # check if the post request has the file part
        if 'file' not in request.files:
            resp = jsonify({'message': 'Please upload a file!!'})
            resp.status_code = 400
            return resp
        file = request.files['file']
        if file.filename == '':
            resp = jsonify({'message': 'File not found for processing'})
            resp.status_code = 400
            return resp
        if file and allowed_file(file.filename):
            # filename = secure_filename(file.filename)
            df = pd.read_csv(io.BytesIO(file.read()), encoding="ISO-8859-1", header=None)
            session_id = request.cookies.get("session_id") if request.cookies.get("session_id") else ""
            df = df.fillna("NULL")
            dataframes[f"{session_id}_original"] = df
            dataframes[f"{session_id}_modified"] = df
            return jsonify(df.to_dict(orient="records"))
            # file.save(os.path.join(app.config['UPLOAD_FOLDER'], f"{session.id}_{filename}"))
            # session['files'].append(f"{session.id}_{filename}")
            # session.save()
            # resp = jsonify({'message': 'File successfully uploaded'})
            # resp.status_code = 201
            # return resp
        else:
            resp = jsonify({'message': 'Allowed file types are txt, csv, xlsx'})
            resp.status_code = 400
            return resp


if __name__ == "__main__":
    app.run()
