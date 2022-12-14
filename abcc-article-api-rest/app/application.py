from flask import Flask
from flask_cors import CORS, cross_origin
from config import Config
from flask_sqlalchemy import SQLAlchemy
from blueprints.article import article_bp

db = SQLAlchemy()

app = Flask(__name__)

CORS(app, resources={r'*': {"origins":"http://localhost:3000"}}) 
app.config.from_object(Config())


app.register_blueprint(article_bp)

db.init_app(app)

@app.route('/')
def index():
    return 'API Created by: Severo Iglesias!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)