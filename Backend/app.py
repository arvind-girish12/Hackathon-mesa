from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from datetime import datetime
from rag_handler import get_rag_response
import os
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'active',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'RAG API',
        'version': '1.0'
    })

@app.route('/api/ask', methods=['POST'])
def ask_question():
    try:
        data = request.get_json()
        question = data.get('question')
        
        if not question:
            return jsonify({'error': 'Question parameter is required'}), 400
            
        answer = get_rag_response(question)
        return jsonify({
            'question': question,
            'answer': answer,
            'timestamp': datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'timestamp': datetime.utcnow().isoformat()
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
