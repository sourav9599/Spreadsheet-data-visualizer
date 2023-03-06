import io
import uuid
import dtale
import pandas as pd
import datetime
from AppEngg import app, db
from AppEngg.models import Usage
from dtale.views import startup
from flask import request, jsonify
import openai

openai.api_key = "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"

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


# Set the daily limit and reset time
daily_limit = 500
reset_time = datetime.time(hour=0, minute=0)


def check_token_limit(user_id, tokens):
    # Check the number of tokens used by the user today
    today = datetime.datetime.now().date()
    reset_datetime = datetime.datetime.combine(today, reset_time)
    records = db.engine.execute("SELECT COALESCE(SUM(tokens), 0) FROM usage WHERE user_id = ? AND timestamp >= ?",
                                (user_id, reset_datetime))
    print(records)
    total_tokens_used = records[0]

    if total_tokens_used + tokens > daily_limit:
        # Daily limit exceeded
        return False
    else:
        # Add the current usage to the database
        timestamp = datetime.datetime.now()
        db.session.add(Usage(user_id=user_id,
                             timestamp=timestamp,
                             tokens=tokens))
        db.session.commit()
        return True


# def generate_code(user_id, prompt):
#     # Calculate the number of tokens needed for the prompt
#     prompt_tokens = openai.Completion.create(engine="davinci-codex", prompt=prompt)["choices"][0]["tokens"]
#
#     if not check_token_limit(user_id, prompt_tokens):
#         # Daily limit exceeded
#         raise ValueError("Daily token limit exceeded for user.")
#
#     # Calculate the number of tokens remaining for the generated code
#     code_tokens = max_tokens - prompt_tokens
#
#     # Generate the code using OpenAI API
#     response = openai.Completion.create(
#         engine="davinci-codex",
#         prompt=prompt,
#         max_tokens=code_tokens,
#         n=1,
#         stop=None,
#         temperature=0.7,
#     )
#
#     # Add the token usage for the generated code to the database
#     code_tokens_used = response.choices[0].tokens_used
#     db.session.add(Usage(user_id=user_id,
#                          timestamp=datetime.datetime.now(),
#                          tokens=code_tokens_used))
#     db.session.commit()
#
#     return response.choices[0].text.strip()


@app.route("/chatgpt", methods=['POST'])
def describe_data():
    message = request.get_json(force=True)['question']
    response = openai.Completion.create(
        model="text-davinci-003",  # "code-davinci-002"
        prompt=message,
        temperature=0,
        max_tokens=3500,
        top_p=1,
        frequency_penalty=0.5,
        presence_penalty=0
    )
    print(response)
    return {"answer": str(response["choices"][0]["text"])}


@app.route("/load-original", methods=['GET'])
def load_original_data():
    session_id = request.args.get('session_id')
    if session_id in original_dataframes and session_id in modified_dataframes:
        return jsonify(original_dataframes[session_id].to_json(orient="table", index=False))
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
