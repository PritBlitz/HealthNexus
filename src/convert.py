import tf2onnx
import tensorflow as tf

# Load the Keras model
model = tf.keras.models.load_model("skin_disease_model.h5")

# Convert to ONNX format
onnx_model_path = "skin_disease_model.onnx"
spec = (tf.TensorSpec((None, 224, 224, 3), tf.float32, name="input"),)
model_proto, _ = tf2onnx.convert.from_keras(model, input_signature=spec, opset=13)
with open(onnx_model_path, "wb") as f:
    f.write(model_proto.SerializeToString())

print(f"Model saved to {onnx_model_path}")
