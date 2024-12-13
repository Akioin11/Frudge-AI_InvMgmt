from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

API_KEY = "AIzaSyCBV_vcY5dN1xGiOr5-mDVRI8j_6ZWu-jI"
genai.configure(api_key=API_KEY)

@app.route('/upload', methods=['POST'])
def upload_files():
    # Check if files are in the request
    files = request.files.getlist('file')
    
    if len(files) == 0:
        return jsonify({"error": "No files part"}), 400
    
    # Ensure that no more than 3 files are uploaded
    if len(files) > 3:
        return jsonify({"error": "You can only upload up to 3 files"}), 400
    
    # Save uploaded files
    file_paths = []
    for file in files:
        if file.filename == '':
            return jsonify({"error": "One of the files has no selected file"}), 400

        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        file_paths.append(file_path)
        print(f"File saved to: {file_path}")

    # Upload files to the Generative AI model
    genai_files = [genai.upload_file(file_path) for file_path in file_paths]
    print(f"Files uploaded to Generative AI: {genai_files}")

    # Prepare the prompt and generate the content
    prompt = request.form.get('prompt', 'Only respond with most certain info. 1.What fruit or edible item do you see? 2.What stage of its life is it in? 3.How many days since its unedible?, 4.what recipes can be made out of it?')
    model = genai.GenerativeModel("gemini-1.5-flash")
    result = model.generate_content([prompt, *genai_files])
    ai_response = result.text
    print(f"{ai_response}")

    # Return AI response to frontend
    return jsonify({"message": "Processing complete!", "ai_response": ai_response}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)