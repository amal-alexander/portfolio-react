from flask import jsonify, request
from config import app
import requests
from bs4 import BeautifulSoup
from natural.distance import levenshtein

@app.route('/seo/analyze', methods=['POST'])
def analyze_seo():
    url = request.json.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract SEO data
        title = soup.title.string if soup.title else None
        meta_description = soup.find('meta', {'name': 'description'})
        description = meta_description.get('content') if meta_description else None

        # Extract headings
        headings = {
            'h1': [h.text.strip() for h in soup.find_all('h1')],
            'h2': [h.text.strip() for h in soup.find_all('h2')],
            'h3': [h.text.strip() for h in soup.find_all('h3')]
        }

        # Extract meta tags
        meta_tags = [{
            'name': tag.get('name', ''),
            'content': tag.get('content', '')
        } for tag in soup.find_all('meta') if tag.get('name')]

        return jsonify({
            'title': title,
            'description': description,
            'headings': headings,
            'meta_tags': meta_tags,
            'url': url
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/similarity/check', methods=['POST'])
def check_similarity():
    data = request.json
    text1 = data.get('text1', '')
    text2 = data.get('text2', '')

    if not text1 or not text2:
        return jsonify({'error': 'Both text fields are required'}), 400

    try:
        # Calculate similarity using Levenshtein distance
        distance = levenshtein(text1, text2)
        max_length = max(len(text1), len(text2))
        similarity = 1 - (distance / max_length) if max_length > 0 else 1

        return jsonify({
            'similarity_score': round(similarity * 100, 2),
            'distance': distance
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500