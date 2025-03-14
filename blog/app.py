from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify(message="Welcome to the homepage!")

@app.route('/robots.txt')
def robots():
    # Return the content of robots.txt with the correct Content-Type header
    return "User-agent: *\nDisallow: /admin/\n", 200, {'Content-Type': 'text/plain'}

if __name__ == '__main__':
    # Run the app in debug mode only during development
    app.run(debug=True)