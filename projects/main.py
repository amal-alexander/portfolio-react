from config import app, db
from routes import *
from models import BlogPost, CodeBlock, Image

# Create database tables
def init_db():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    init_db()
    app.run(port=5002, debug=True)