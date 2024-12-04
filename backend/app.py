import os
import logging
import warnings
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from werkzeug.utils import secure_filename
from flask_cors import CORS

# Initialize Flask app




# Suppress warnings and logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
logging.getLogger("tensorflow").setLevel(logging.ERROR)
warnings.filterwarnings("ignore")

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Load the trained model
model = load_model("skin_cancer_classifier.h5", compile=False)

def allowed_file(filename):
    """Check if the file is of an allowed type."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/predict", methods=["POST"])
def predict():
    """Handle image uploads and return predictions."""
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file and allowed_file(file.filename):
        # Save the file temporarily
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        try:
            # Preprocess the image
            img = load_img(file_path, target_size=(150, 150))
            img_array = img_to_array(img) / 255.0  # Normalize pixel values
            img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

            # Make a prediction
            prediction = model.predict(img_array)[0][0]
            category = "No Cancer" if prediction >= 0.5 else "Cancer"
            confidence = (1 - prediction) * 100 if category == "Cancer" else prediction * 100

            # Delete the uploaded file after processing
            os.remove(file_path)

            # Return the prediction result
            return jsonify({"category": category, "confidence": round(confidence, 2)})

        except Exception as e:
            # Handle errors and cleanup
            os.remove(file_path)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid file type"}), 400

if __name__ == "__main__":
    app.run(debug=True)
