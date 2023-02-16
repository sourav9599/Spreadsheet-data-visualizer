import io
import uuid
import dtale
from dtale.views import startup
import pandas as pd
from app import app
from flask import request, jsonify

# from flask_sslify import SSLify
# sslify = SSLify(app)
ALLOWED_EXTENSIONS = {'csv', 'xlsx', "xls", "xlsm", 'xlsb', 'odf', 'ods', 'odt'}

original_dataframes, modified_dataframes, instance_ids = {}, {}, {}


def generate_unique_id():
    # Generate a unique identifier for the user session
    return str(uuid.uuid4())


def read_data(file_extension: str, file, has_header):
    header: int | None = 0 if has_header == "true" else None
    df = None
    if file_extension == 'csv':
        df = pd.read_csv(io.BytesIO(file.read()), header=header)
    if file_extension in ['xlsx', "xls", "xlsm", 'xlsb', 'odf', 'ods', 'odt']:
        df = pd.read_excel(io.BytesIO(file.read()), header=header)
    return df


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route("/describe-data", methods=['GET'])
def describe_data():
    session_id = request.args.get('session_id')
    if session_id in original_dataframes and session_id in modified_dataframes:
        original = original_dataframes[session_id]
        modified = original.describe()
        modified = modified.reset_index(level=0)
        modified_dataframes[session_id] = modified
        return jsonify(modified.to_dict(orient="records"))
    else:
        resp = jsonify({'message': 'File not found. Please re-upload.'})
        resp.status_code = 400
        return resp


@app.route("/load-original", methods=['GET'])
def load_original_data():
    session_id = request.args.get('session_id')
    if session_id in original_dataframes and session_id in modified_dataframes:
        return jsonify(original_dataframes[session_id].to_json(orient="table", index=False))
    else:
        resp = jsonify({'message': 'File not found. Please re-upload.'})
        resp.status_code = 400
        return resp


@app.route("/fill-null-data", methods=['POST'])
def fill_null_values():
    session_id = request.args.get('session_id')
    column_names = request.get_json()
    if session_id in original_dataframes and session_id in modified_dataframes:
        original = original_dataframes[session_id]
        modified = original.sort_values(by=column_names)
        modified_dataframes[session_id] = modified
        return jsonify(modified.fillna("NULL").to_dict(orient="records"))
    else:
        resp = jsonify({'message': 'File not found. Please re-upload.'})
        resp.status_code = 400
        return resp

@app.route("/visualize-data", methods=['POST'])
def start_dtale_session():
    session_id = request.args.get('session_id')
    if session_id in original_dataframes and session_id in modified_dataframes:
        if session_id in instance_ids:
            instance = dtale.get_instance(instance_ids[session_id])
            instance.cleanup()
            print(dtale.instances())

        instance = startup(data=original_dataframes[session_id], ignore_duplicate=True)
        instance_ids[session_id] = instance._data_id
        return jsonify({
            "dtale_instance_url": instance.main_url()
        })           
    else:
        resp = jsonify({'message': 'File not found. Please re-upload.'})
        resp.status_code = 400
        return resp
    
@app.route("/update-data", methods=['POST'])
def update_data():
    session_id = request.args.get('session_id')
    if session_id in original_dataframes and session_id in modified_dataframes:
        instance = dtale.get_instance(instance_ids[session_id])
        modified_dataframes[session_id] = instance.data
        print(modified_dataframes[session_id])
        return {'message': 'Successfully saved dataframe.....'}
    else:
        resp = jsonify({'message': 'File not found. Please re-upload.'})
        resp.status_code = 400
        return resp

@app.route("/kill-dtale-instance", methods=['POST'])
def kill_dtale_instance():
    session_id = request.args.get('session_id')
    if session_id in instance_ids:
        instance = dtale.get_instance(instance_ids[session_id])
        instance.cleanup()
        print(dtale.instances())
        return {'message': f'cleaned up dtale instances for session_id: {session_id}'}
    return {'message': f'No dtale instances were found for session_id: {session_id}'}
    
@app.route('/file-upload', methods=['POST'])
def upload_file():
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
        if file.content_length > app.config['MAX_CONTENT_LENGTH']:
            resp = jsonify({'message': '"File size exceeded limit."'})
            resp.status_code = 400
            return resp
        session_id = generate_unique_id()
        file_extension = file.filename.rsplit('.', 1)[1].lower()
        df = read_data(file_extension, file, request.args.get('hasHeader'))
        # remove the oldest dataframe if the limit is reached
        if len(original_dataframes) > app.config['MAX_DF_COUNT']:
            original_dataframes.pop(next(iter(original_dataframes)))
        if len(modified_dataframes) > app.config['MAX_DF_COUNT']:
            modified_dataframes.pop(next(iter(modified_dataframes)))

        original_dataframes[session_id] = df
        modified_dataframes[session_id] = df

        return {
            "session_id": session_id,
            "table": df.to_json(orient="table", index=False)
        }
    else:
        resp = jsonify({'message': 'Allowed file types are txt, csv, xlsx'})
        resp.status_code = 400
        return resp


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
