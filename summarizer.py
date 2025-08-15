import os
import nltk
from nltk.tokenize import sent_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Ensure punkt tokenizer is available
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# Function to read text from file
def read_text(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Extractive summarizer function
def extractive_summarizer(file_path, num_sentences=3):
    text = read_text(file_path)
    sentences = sent_tokenize(text)

    # Compute TF-IDF
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(sentences)

    # Calculate similarity matrix
    similarity_matrix = cosine_similarity(tfidf_matrix)

    # Rank sentences by score
    scores = similarity_matrix.sum(axis=1)
    ranked_sentences = [sentences[i] for i in np.argsort(scores, axis=0)[-num_sentences:][::-1]]

    return " ".join(ranked_sentences)

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    file_path = input("Enter the path to the text file: ")
    
    if not os.path.exists(file_path):
        print("File not found. Please check the path.")
    else:
        try:
            num = int(input("How many summary sentences do you want? "))
            summary_result = extractive_summarizer(file_path, num_sentences=num)
            print("\n=== Extractive Summary ===\n")
            print(summary_result)
        except Exception as e:
            print("An error occurred:", e)
