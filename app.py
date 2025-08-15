from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.tokenize import sent_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Download sentence tokenizer
nltk.download('punkt')

app = Flask(__name__)
CORS(app)

# Main summarizer function
def extractive_summarizer(text, num_sentences=3):
    sentences = sent_tokenize(text)
    
    if len(sentences) == 0:
        return ["No valid sentences found in input."]

    if num_sentences >= len(sentences):
        return sentences

    # TF-IDF and similarity scoring
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(sentences)
    similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)
    sentence_scores = similarity_matrix.sum(axis=1)

    # Rank and pick top sentences
    ranked_sentences_idx = np.argsort(sentence_scores)[-num_sentences:][::-1]
    summary = [sentences[i] for i in sorted(ranked_sentences_idx)]
    return summary

# API endpoint
@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get('text', '')
    num_sentences = int(data.get('num_sentences', 3))

    if not text.strip():
        return jsonify({'summary': ["Text input is empty."]}), 400

    summary = extractive_summarizer(text, num_sentences)
    return jsonify({'summary': " ".join(summary)})

# Run the server
if __name__ == '__main__':
    app.run(debug=True)
