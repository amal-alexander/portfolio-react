from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

# Example blog posts data (in-memory storage)
posts = []

@app.route('/')
def home():
    return jsonify(message="Welcome to the homepage!")

@app.route('/api/posts', methods=['GET', 'POST'])
def handle_posts():
    if request.method == 'GET':
        # Return all posts
        return jsonify(posts)
    elif request.method == 'POST':
        # Create a new post
        new_post = request.json
        new_post["date_posted"] = datetime.now().isoformat()
        posts.append(new_post)
        return jsonify(new_post), 201

@app.route('/api/posts/category/<string:category>', methods=['GET'])
def get_posts_by_category(category):
    # Filter posts by category
    filtered_posts = [post for post in posts if post.get("category") == category]
    return jsonify(filtered_posts)

if __name__ == "__main__":
    app.run(debug=True)