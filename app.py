import os
from flask import Flask, render_template, request, jsonify
from pdfminer.high_level import extract_text as extract_pdf_text
from docx import Document
import spacy
import json

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

nlp = spacy.load('en_core_web_sm')

def extract_text_from_pdf(file_path):
    return extract_pdf_text(file_path)

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return ' '.join([para.text for para in doc.paragraphs])

def extract_skills(text):
    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ in ['ORG', 'GPE', 'NORP']]
    return skills

with open('data/jobs.json') as f:
    jobs_data = json.load(f)

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
        file.save(file_path)
        try:
            if file.filename.endswith('.pdf'):
                text = extract_text_from_pdf(file_path)
            elif file.filename.endswith('.docx'):
                text = extract_text_from_docx(file_path)
            skills = extract_skills(text)
            return jsonify({"skills": skills, "file_path": file_path})
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
    required_skills = set(request.json.get('required_skills'))
    
    try:
        print(f"Debug: Calculating match for file_path: {file_path}")
        if file_path.endswith('.pdf'):
            text = extract_text_from_pdf(file_path)
        elif file_path.endswith('.docx'):
            text = extract_text_from_docx(file_path)
        user_skills = set(extract_skills(text))
        match_percentage = len(user_skills & required_skills) / len(required_skills) * 100
        return jsonify({"match_percentage": match_percentage})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
