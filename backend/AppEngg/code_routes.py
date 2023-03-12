from AppEngg import app
from flask import request, jsonify
from tinydb import TinyDB, Query
import openai
import datetime

# Set the daily limit and reset time
MAX_TOKENS_PER_DAY = 1000
tiny_db = TinyDB('db.json')
tokens_metadata = tiny_db.table('tokens_metadata')
search_metadata = tiny_db.table('search_metadata')


def check_token_limit():
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    usage = Query()
    result = tokens_metadata.search(usage.date == today)
    if not result:
        return [False, 0]
    tokens_used_today = result[0]['tokens_used']
    if tokens_used_today >= MAX_TOKENS_PER_DAY:
        return [True, tokens_used_today]
    return [False, tokens_used_today]


@app.route("/chatgpt", methods=['POST'])
def generate_code():
    openai.api_key = request.args.get('key')
    question = request.get_json(force=True)['question']
    ignore_hint = request.args.get('ignore_hint')
    programming_language = request.args.get('lang')
    technology = request.args.get('tech')
    prompt = f"{programming_language} code that {question} in {technology}"
    
    # Check if a result already exists for the given input text
    if ignore_hint == "false":
        search = Query()
        result = search_metadata.search(search.input_text == prompt)
        if result:
            return jsonify({'input_text': result[0]['input_text'], 'hint': result[0]['response_text'], 'time': result[0]['time'], 'tokens_used': 0})

    token_limit = check_token_limit()
    print(token_limit)
    if token_limit[0]:
        # Daily limit exceeded
        return jsonify({'message': f'Maximum token limit exceeded for today. Used tokens {token_limit[1]}'}), 403

    code_tokens = MAX_TOKENS_PER_DAY - token_limit[1]

    # Generate the code using OpenAI API
    response = openai.Completion.create(
        model="text-davinci-003",  # "code-davinci-002"
        prompt=prompt,
        temperature=0,
        max_tokens=code_tokens,
        top_p=1,
        frequency_penalty=0.5,
        presence_penalty=0
    )

    # Save the usage in the database
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    usage = Query()
    result = tokens_metadata.search(usage.date == today)
    print(response)
    if not result:
        tokens_metadata.insert({'date': today, 'tokens_used': response["usage"]['total_tokens']})
    else:
        tokens_metadata.update({'tokens_used': result[0]['tokens_used'] + response["usage"]['total_tokens']},
                                usage.date == today)

    search = Query()
    search_result = search_metadata.search(search.input_text == prompt)
    if search_result:
        search_metadata.update({'input_text': prompt, 'response_text': response.choices[0].text.strip(), "time": datetime.datetime.now().strftime("%B %d, %Y at %H:%M:%S")})
    else:
        search_metadata.insert({'input_text': prompt, 'response_text': response.choices[0].text.strip(), "time": datetime.datetime.now().strftime("%B %d, %Y at %H:%M:%S")})

    return {"answer": response.choices[0].text.strip(), 'tokens_used': response["usage"]['total_tokens']}

# @app.route("/chatgpt", methods=['POST'])
# def describe_data():
#     message = request.get_json(force=True)['question']
#     response = openai.Completion.create(
#         model="text-davinci-003",  # "code-davinci-002"
#         prompt=message,
#         temperature=0,
#         max_tokens=3500,
#         top_p=1,
#         frequency_penalty=0.5,
#         presence_penalty=0
#     )
#     print(response)
#     return {"answer": response.choices[0].text.strip()}
