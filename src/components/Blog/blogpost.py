from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db'
db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/api/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([{"title": post.title, "content": post.content, "date_posted": post.date_posted} for post in posts])

@app.route('/api/posts', methods=['POST'])
def add_post():
    data = request.get_json()
    new_post = Post(title=data['title'], content=data['content'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post added successfully!"}), 201

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)