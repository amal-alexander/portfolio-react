from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize SQLAlchemy
db = SQLAlchemy(app)