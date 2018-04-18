from flask import Flask
from flask_cors import CORS
import requests
import xmltodict, json

app = Flask(__name__)
CORS(app, resources=r'/api/*')

@app.route('/')
def hello():
    return 'Hello!'

@app.route('/api/user-ratings/<username>')
def get_mal_user_ratings(username):
    req = requests.get('https://myanimelist.net/malappinfo.php?status=all&type=anime&u=' + username)
    data = json.dumps(xmltodict.parse(req.text))
    return data

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True)

