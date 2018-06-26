from flask import Flask
from flask_cors import CORS
import requests
import xmltodict, json
import sqlite3

app = Flask(__name__)
CORS(app, resources=r'/api/*')

@app.route('/')
def hello():
    return 'Hello!'

@app.route('/api/user-ratings/<username>')
def get_mal_user_ratings(username):
    escaped_username = escapeUserInput(username)
    req = requests.get('https://myanimelist.net/malappinfo.php?status=all&type=anime&u=' + escaped_username)
    if req.ok:
        return json.dumps(xmltodict.parse(req.text))
    else:
        return 'MyAnimeList API is down - check back later'

@app.route('/api/genre-data')
def get_anime_genre_data():
    conn = sqlite3.connect('genre.db')
    c = conn.cursor()
    c.execute('SELECT * FROM genres')
    genre_list = c.fetchall()
    conn.close()
    return json.dumps(genre_list)

def escapeUserInput(userInput):
    userInput = userInput.replace('&', '&amp;')
    userInput = userInput.replace('<', '&lt;')
    userInput = userInput.replace('>', '&gt;')
    userInput = userInput.replace('\"', '&quot;')
    userInput = userInput.replace('\'', '&apos;')
    return userInput

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, threaded=True)

