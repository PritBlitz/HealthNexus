import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Flatten, Dense, Dropout
from sklearn.utils.class_weight import compute_class_weight
import numpy as np
import os

# Path to the dataset
dataset_path = "dataset/"

# Data augmentation and rescaling
train_data_gen = ImageDataGenerator(
    rescale=1.0 / 255,
    validation_split=0.2,
    rotation_range=15,
    zoom_range=0.2,
    horizontal_flip=True,
)

train_gen = train_data_gen.flow_from_directory(
    dataset_path,
    target_size=(150, 150),
    batch_size=32,
    class_mode="binary",
    subset="training",
)

val_gen = train_data_gen.flow_from_directory(
    dataset_path,
    target_size=(150, 150),
    batch_size=32,
    class_mode="binary",
    subset="validation",
)

# Compute class weights
class_labels = train_gen.classes
class_weight = compute_class_weight("balanced", classes=np.unique(class_labels), y=class_labels)
class_weight_dict = dict(enumerate(class_weight))

print(f"Class Weights: {class_weight_dict}")

# Load the pretrained MobileNetV2 model
base_model = MobileNetV2(weights="imagenet", include_top=False, input_shape=(150, 150, 3))
base_model.trainable = False  # Freeze the base model weights

# Build the model
model = Sequential([
    base_model,
    Flatten(),
    Dense(128, activation="relu"),
    Dropout(0.5),
    Dense(1, activation="sigmoid"),
])

# Compile the model
model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])

# Train the model
history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=10,
    class_weight=class_weight_dict,
    verbose=1,
)

# Save the model
model.save("skin_cancer_classifier.h5")
