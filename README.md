# HealthNexus

## **HealthNexus** is an advanced AI-based web application designed to analyze images of skin conditions and determine whether they indicate the presence of skin cancer . Built using TensorFlow and flask, the project leverages cutting-edge machine learning and optimized inference to provide fast and accurate results.

## Table of Contents:

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Contributors](#contributors)

---

## Overview

HealthNexus is a solution aimed at improving early detection of skin diseases by combining:

- **AI-powered image analysis** to scan for abnormalities in skin images.
- **TensorFlow integration** for precise and efficient detection.
- Accessibility for users seeking a preliminary diagnosis tool.

## This project is a collaborative effort of four contributors passionate about leveraging AI for healthcare innovations.

## Features:

- Upload an image of a skin condition and receive a diagnostic result.
- AI-based detection of skin cancer with high accuracy.
- Lightweight and optimised interface using tensorflow for faster results.
- Simple, user-friendly web interface for ease of use.

---

## Setup

### Prerequisites

Python Dependencies :

```
pip install flask flask-cors numpy tensorflow openvino-dev scikit-learn
```

React Dependencies :

```
npm install react @mui/material framer-motion axios react-chartjs-2 chart.js @mui/icons-material @splinetool/react-spline
```

### Model and Dataset

Model Used :
**MobileNetV2** model - a lightweight convolutional neural network (CNN) known for its efficiency in image classification tasks.

Dataset Used :
[skincancer-binary-classification-dataset](https://www.kaggle.com/datasets/kylegraupe/skin-cancer-binary-classification-dataset)

### Train the Model

To Train the model Run

```
python train.py
```

To Test the Results run

```
test.py
```

### Run the Application

Run the Backend :

```
python backend/app.py
```

Run the React App :

```
npm run dev
```

---

## Contributors:

- [Pritish Biswas](https://github.com/PritBlitz)
- [Tushar Kumar](https://github.com/kumartushar0605)
- [Ayush Kumar](https://github.com/ayushkumar1991)
- [Ayush K Tripathi](https://github.com/Alatus01)
