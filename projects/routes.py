from flask import jsonify, request
from config import app, db
from models import BlogPost, CodeBlock, Image

@app.route('/')
def home():
    return jsonify(message="Welcome to the Blog API!")

@app.route('/posts', methods=['GET', 'POST'])
def handle_posts():
    if request.method == 'GET':
        posts = BlogPost.query.all()
        return jsonify([{
            'id': post.id,
            'title': post.title,
            'slug': post.slug,
            'content': post.content,
            'author': post.author,
            'category': post.category,
            'cover_image': post.cover_image,
            'created_at': post.created_at.isoformat(),
            'code_blocks': [{
                'language': block.language,
                'code': block.code,
                'description': block.description
            } for block in post.code_blocks],
            'images': [{
                'url': img.url,
                'caption': img.caption,
                'alt_text': img.alt_text
            } for img in post.images]
        } for post in posts])
    
    elif request.method == 'POST':
        data = request.json
        
        # Check required fields
        if not all(field in data for field in ['title', 'content', 'category', 'author']):
            return jsonify({'error': 'Missing required fields'}), 400
            
        # Create new blog post
        new_post = BlogPost(
            title=data['title'],
            slug=data.get('slug'),
            content=data['content'],
            author=data['author'],
            category=data['category'],
            cover_image=data.get('cover_image')
        )
        
        # Add code blocks if present
        if 'code_blocks' in data:
            for block_data in data['code_blocks']:
                code_block = CodeBlock(
                    language=block_data.get('language'),
                    code=block_data.get('code'),
                    description=block_data.get('description')
                )
                new_post.code_blocks.append(code_block)
        
        # Add images if present
        if 'images' in data:
            for image_data in data['images']:
                if 'url' in image_data:
                    image = Image(
                        url=image_data['url'],
                        caption=image_data.get('caption'),
                        alt_text=image_data.get('alt_text')
                    )
                    new_post.images.append(image)
        
        db.session.add(new_post)
        db.session.commit()
        
        return jsonify({
            'id': new_post.id,
            'title': new_post.title,
            'message': 'Post created successfully'
        }), 201

@app.route('/posts/category/<category>', methods=['GET'])
def get_posts_by_category(category):
    posts = BlogPost.query.filter_by(category=category).all()
    return jsonify([{
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author': post.author,
        'category': post.category,
        'created_at': post.created_at.isoformat()
    } for post in posts])