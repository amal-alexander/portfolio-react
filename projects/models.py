# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from config import db

class CodeBlock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(50))
    code = db.Column(db.Text)
    description = db.Column(db.Text)
    blog_post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'))

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255))
    alt_text = db.Column(db.String(255))
    blog_post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'))

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(200), unique=True)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    cover_image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    code_blocks = db.relationship('CodeBlock', backref='blog_post', lazy=True)
    images = db.relationship('Image', backref='blog_post', lazy=True)

    def __repr__(self):
        return f'<BlogPost {self.title}>'