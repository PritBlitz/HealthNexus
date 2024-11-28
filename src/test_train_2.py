from datasets import load_dataset
import tensorflow as tf
from tensorflow.keras.utils import load_img, img_to_array # type: ignore
from tensorflow.keras.models import Sequential # type: ignore
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout # type: ignore
from sklearn.model_selection import train_test_split
import numpy as np

# Constants
IMG_HEIGHT, IMG_WIDTH = 224, 224
BATCH_SIZE = 32
EPOCHS = 10

# Load dataset
ds = load_dataset("SM200203102097/skinDiseasesDetectionModel")

# Preprocess data
def preprocess_data(eg):
    images = []
    labels = []
    for i, data in enumerate(eg['image']):
        try:
            # Use image directly if it's PIL.Image; else load from path
            if isinstance(data, str):
                image = load_img(data, target_size=(IMG_HEIGHT, IMG_WIDTH))
            else:
                image = data.resize((IMG_HEIGHT, IMG_WIDTH))
            
            img = img_to_array(image)
            images.append(img)
            labels.append(eg['label'][i])
        except Exception as e:
            print(f"Skip image {i} due to error: {e}")
    return np.array(images), np.array(labels)

# Load train and validation/test splits
train_images, train_labels = preprocess_data(ds['train'])
if "validation" in ds:
    test_images, test_labels = preprocess_data(ds['validation'])
else:
    train_images, test_images, train_labels, test_labels = train_test_split(
        train_images, train_labels, test_size=0.2, random_state=42
    )

# Verify data sizes
if len(train_images) == 0 or len(train_labels) == 0:
    raise ValueError("Training data is empty. Check preprocessing or dataset.")

# Encode labels (categorical)
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical # type: ignore

encoder = LabelEncoder()
train_labels = encoder.fit_transform(train_labels)
test_labels = encoder.transform(test_labels)

num_classes = len(np.unique(train_labels))
train_labels = to_categorical(train_labels, num_classes)
test_labels = to_categorical(test_labels, num_classes)

# Define CNN model
model = Sequential([
    Conv2D(32, (3, 3), activation="relu", input_shape=(IMG_HEIGHT, IMG_WIDTH, 3)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation="relu"),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation="relu"),
    Dropout(0.5),
    Dense(num_classes, activation="softmax"),
])

model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# Train model
history = model.fit(train_images, train_labels, epochs=EPOCHS, batch_size=BATCH_SIZE)

# Evaluate model
test_loss, test_acc = model.evaluate(test_images, test_labels)
print(f"Test accuracy: {test_acc}")

# Save model
model.save("skin_disease_model.h5")
print("Model saved to skin_disease_model.h5")
