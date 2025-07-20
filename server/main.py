from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from tensorflow.lite.python.interpreter import Interpreter
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware

# Load TFLite model at startup
MODEL_PATH = "./data/digit_recognition.tflite"
interpreter = Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

# Get input and output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

app = FastAPI()

# CORS setup
origins = os.getenv("FRONTEND_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow any origin
    allow_credentials=True,
    allow_methods=["GET", "POST"],  # Allow GET and POST methods
    allow_headers=["Authorization", "Content-Type", "Accept", "Origin", "User-Agent", "X-Requested-With"],
)

IMG_SIZE = (28, 28)  # Standard size for MNIST images (28x28)

class PredictRequest(BaseModel):
    input_data: list  # A list of pixel values

@app.get("/")
def read_root():
    return {"message": "Welcome to MNISTic"}

@app.post("/predict")
async def predict(request: PredictRequest):
    try:
        # Log input data
        print(f"Received input data: {request.input_data[:10]}...")  # Log only first 10 values for brevity

        # Convert the input array to a numpy array
        img_array = np.array(request.input_data, dtype=np.float32)

        # Ensure the image has 784 pixels (28x28)
        if img_array.size != 784:
            raise HTTPException(status_code=400, detail="Input array must have 784 values (28x28 image)")

        img_array = img_array.reshape(28, 28)

        # Add batch dimension to match model input shape (28, 28, 1)
        img_array = np.expand_dims(img_array, axis=0)  # Adds the batch dimension (1, 28, 28, 1)

        # Check the shape of img_array
        print(f"Shape of input image for TFLite model: {img_array.shape}")

        # Set the input tensor to the preprocessed image
        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()

        # Get prediction output
        output_data = interpreter.get_tensor(output_details[0]['index'])
        prediction = np.argmax(output_data)  # Get the index with the highest confidence
        confidence = np.max(output_data)  # Confidence score

        return JSONResponse({
            "prediction": int(prediction),
            "confidence": round(float(confidence), 4)
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")  # Log error for debugging
        return JSONResponse(status_code=500, content={"error": str(e)})