import logging
import os
import warnings
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# Suppress warnings and logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
logging.getLogger("tensorflow").setLevel(logging.ERROR)
warnings.filterwarnings("ignore")

# Load the trained model
model = load_model("skin_cancer_classifier.h5")

# Path to the test image
test_image_path = "hiii.jpg"  # Replace with your image path

# Preprocess the image
img = load_img(test_image_path, target_size=(150, 150))  # Ensure target size matches the training size
img_array = img_to_array(img) / 255.0  # Normalize pixel values
img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

# Make a prediction
prediction = model.predict(img_array)[0][0]

# Interpret the result
category = "No Cancer" if prediction >= 0.5 else "Cancer"
confidence = (1 - prediction) * 100 if category == "Cancer" else prediction * 100


# Output the results
print(f"The image is classified as: {category} with confidence: {confidence:.2f}%")
