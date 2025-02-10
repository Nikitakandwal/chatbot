import os
import logging
from flask import Flask, render_template, request, jsonify
from pdfminer.high_level import extract_text as extract_pdf_text
from docx import Document
import spacy
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')   

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

nlp = spacy.load('en_core_web_lg') 
sbert_model = SentenceTransformer('all-MiniLM-L6-v2')

# Load skills and jobs data
with open('data/jobs.json') as f:
    jobs_data = json.load(f)

with open('data/skills.json') as f:
    skills_data = json.load(f)

# Cache domain embeddings for faster prediction
domain_embeddings = {domain: sbert_model.encode([' '.join(skills)])[0] for domain, skills in skills_data.items()}

def extract_text_from_pdf(file_path):
    return extract_pdf_text(file_path)

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return ' '.join([para.text for para in doc.paragraphs])

def extract_skills(text):
    """
    Extract skills using SpaCy NER and a predefined skill list.
    """
    doc = nlp(text)
    skills = set()
    
    # Extract skills using SpaCy NER
    for ent in doc.ents:
        if ent.label_ == 'SKILL':
            skills.add(ent.text.lower())
    
    # Match skills from the predefined skill list
    for skill_list in skills_data.values():
        for skill in skill_list:
            if skill.lower() in text.lower():
                skills.add(skill.lower())
    
    return list(skills)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and (file.filename.endswith('.pdf') or file.filename.endswith('.docx')):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        try:
            file.save(file_path)
            if file.filename.endswith('.pdf'):
                text = extract_text_from_pdf(file_path)
            elif file.filename.endswith('.docx'):
                text = extract_text_from_docx(file_path)
            skills = extract_skills(text)
            domain = predict_domain(text)
            return jsonify({"skills": skills, "file_path": file_path, "domain": domain})
        except Exception as e:
            logger.error(f"Error processing file: {e}")
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid file format"}), 400

@app.route('/get_jobs', methods=['POST'])
def get_jobs():
    domain = request.json.get('domain')
    matching_jobs = jobs_data.get(domain, [])
    return jsonify(matching_jobs)

@app.route('/get_suggestions', methods=['POST'])
def get_suggestions():
    data = request.json
    user_skills = data.get('user_skills')
    required_skills = data.get('required_skills')
    
    print("Received user_skills:", user_skills)  # Debugging
    print("Received required_skills:", required_skills)  # Debugging
    
    try:
        suggestions = generate_suggestions(user_skills, required_skills)
        print("Suggestions generated:", suggestions)  # Debugging
        return jsonify({"suggestions": suggestions})
    except Exception as e:
        logger.error(f"Error generating suggestions: {e}")
        return jsonify({"error": str(e)}), 500

  

# Load a pre-trained SBERT model (fine-tuned on job descriptions if available)
sbert_model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_suggestions(user_skills, required_skills, similarity_threshold=0.7):
    """
    Generate suggestions for the user to improve their resume.
    """
    suggestions = []
    
    if not user_skills or not required_skills:
        return suggestions  # Return empty list if either parameter is None
    
    # Find missing skills
    missing_skills = set(required_skills) - set(user_skills)
    
    if missing_skills:
        suggestions.append({
            "type": "missing_skills",
            "message": "You are missing the following skills:",
            "skills": list(missing_skills)
        })
    
    # Find similar skills that can be improved
    user_skills_embeddings = sbert_model.encode(user_skills)
    required_skills_embeddings = sbert_model.encode(required_skills)
    
    similarity_matrix = cosine_similarity(user_skills_embeddings, required_skills_embeddings)
    for i, user_skill in enumerate(user_skills):
        max_sim = np.max(similarity_matrix[i])
        if max_sim < similarity_threshold:  # Adjustable threshold
            suggestions.append({
                "type": "improve_skill",
                "message": f"Consider improving your skill in '{user_skill}' to better match the job requirements.",
                "skill": user_skill
            })
    
    return suggestions


@app.route('/calculate_match', methods=['POST'])
def calculate_match():
    file_path = request.json.get('file_path')
    required_skills = request.json.get('required_skills')
    
    try:
        if file_path.endswith('.pdf'):
            text = extract_text_from_pdf(file_path)
        elif file_path.endswith('.docx'):
            text = extract_text_from_docx(file_path)
        
        user_skills = extract_skills(text)
        
        # Calculate match percentage
        match_percentage = calculate_skill_match(user_skills, required_skills)
        
        return jsonify({"match_percentage": match_percentage})
    except Exception as e:
        logger.error(f"Error calculating match: {e}")
        return jsonify({"error": str(e)}), 500

def calculate_skill_match(user_skills, required_skills):
    """
    Calculate the match percentage between user skills and required skills.
    """
    if not user_skills or not required_skills:
        return 0.0
    
    # Encode skills
    user_skills_embeddings = sbert_model.encode(user_skills)
    required_skills_embeddings = sbert_model.encode(required_skills)
    
    # Normalize embeddings
    user_skills_embeddings = user_skills_embeddings / np.linalg.norm(user_skills_embeddings, axis=1, keepdims=True)
    required_skills_embeddings = required_skills_embeddings / np.linalg.norm(required_skills_embeddings, axis=1, keepdims=True)
    
    # Calculate cosine similarity
    similarity_matrix = cosine_similarity(user_skills_embeddings, required_skills_embeddings)
    max_similarities = np.max(similarity_matrix, axis=1)
    match_percentage = np.mean(max_similarities) * 100
    
    return round(match_percentage, 2)

def predict_domain(text):
    """
    Predict the domain based on the text using precomputed domain embeddings.
    """
    text_embedding = sbert_model.encode([text])[0]
    max_sim = 0
    predicted_domain = None
    
    for domain, domain_embedding in domain_embeddings.items():
        sim = cosine_similarity([text_embedding], [domain_embedding])[0][0]
        if sim > max_sim:
            max_sim = sim
            predicted_domain = domain
    
    return predicted_domain

if __name__ == '__main__':
    app.run(debug=True)