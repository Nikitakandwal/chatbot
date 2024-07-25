import os
from flask import Flask, render_template, request, jsonify
from pdfminer.high_level import extract_text as extract_pdf_text
from docx import Document
import spacy
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')   
 
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])
 
nlp = spacy.load('en_core_web_lg') 
sbert_model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_text_from_pdf(file_path):
    return extract_pdf_text(file_path)

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return ' '.join([para.text for para in doc.paragraphs])

def extract_skills(text):
    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ == 'SKILL']
    return skills

with open('data/jobs.json') as f:
    jobs_data = json.load(f)

with open('data/skills.json') as f:
    skills_data = json.load(f)

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
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid file format"}), 400

@app.route('/get_jobs', methods=['POST'])
def get_jobs():
    domain = request.json.get('domain')
    matching_jobs = jobs_data.get(domain, [])
    return jsonify(matching_jobs)

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
         
        required_skills_sentence = ' '.join(required_skills)
        user_skills_sentence = ' '.join(user_skills)
         
        required_skills_embedding = sbert_model.encode([required_skills_sentence])
        user_skills_embedding = sbert_model.encode([user_skills_sentence])
         
        cosine_sim = cosine_similarity(required_skills_embedding, user_skills_embedding).flatten()[0]
        
        match_percentage = round(cosine_sim * 100, 2)
        return jsonify({"match_percentage": match_percentage})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def predict_domain(text):
    text_embedding = sbert_model.encode([text])[0]
    max_sim = 0
    predicted_domain = None
    for domain, skills in skills_data.items():
        domain_embedding = sbert_model.encode([' '.join(skills)])[0]
        sim = cosine_similarity([text_embedding], [domain_embedding])[0][0]
        if sim > max_sim:
            max_sim = sim
            predicted_domain = domain
    return predicted_domain

if __name__ == '__main__':
    app.run(debug=True)
