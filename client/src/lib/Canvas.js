"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedImages, setSavedImages] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false); // State to handle loading

  // Set up the canvas drawing context and make it responsive
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Initial fill (black background)
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Handle starting drawing
  const startDrawing = (e) => {
    setIsDrawing(true);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    context.beginPath();
    context.moveTo(x, y);
  };

  // Handle stopping drawing
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Handle drawing while moving mouse
  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    context.strokeStyle = "white";
    context.lineWidth = 25;
    context.lineCap = "round";
    context.lineTo(x, y);
    context.stroke();
  };

  // Handle mouse move event for drawing
  const handleMouseMove = (e) => {
    draw(e);
  };

  // Save the image and convert it to MNIST format
  const saveImage = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const imageDataUrl = canvas.toDataURL("image/png");
    const img = new Image();
    img.src = imageDataUrl;

    return new Promise((resolve) => {
      img.onload = () => {
        const smallCanvas = document.createElement("canvas");
        smallCanvas.width = 28;
        smallCanvas.height = 28;
        const smallContext = smallCanvas.getContext("2d");

        smallContext.drawImage(img, 0, 0, 28, 28);

        const pixelData = smallContext.getImageData(0, 0, 28, 28).data;
        const mnistArray = [];

        for (let i = 0; i < pixelData.length; i += 4) {
          const grayscale = pixelData[i]; // R == G == B for grayscale
          mnistArray.push(grayscale / 255); // Normalize to 0-1
        }

        setSavedImages([mnistArray]); // Save the new image
        resolve();
      };
    });
  };

  // We will use this effect to trigger the request only after savedImages are updated
  useEffect(() => {
    const makePrediction = async () => {
      try {
        if (savedImages.length > 0) {
          const res = await axios.post("http://127.0.0.1:8000/predict", {
            input_data: savedImages[0],
          });
          setPrediction(res.data.prediction);
          setConfidence(res.data.confidence);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Only make prediction if images have been saved
    if (savedImages.length > 0) {
      makePrediction();
    }
  }, [savedImages]); // This hook will run when savedImages are updated

  const predict = async () => {
    await saveImage(); // Wait for the image to be saved first
  };

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "black"; // Clear canvas with black background
    context.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction("");
    setConfidence("");
    setSavedImages([]);
  };

  return (
    <div className="flex flex-col relative">
      <h1 className="text-center text-white pb-2">
        Draw a single Digit on Canvas
      </h1>

      {/* Responsive Canvas Container */}
      <div
        style={{
          width: "100%", // Make the container 100% wide
          maxWidth: "350px", // Limit max width to 350px (updated)
          height: "auto",
          position: "relative",
        }}
      >
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={handleMouseMove}
          style={{
            border: "2px solid white",
            cursor: "crosshair",
            width: "100%", // Make canvas width 100% of its container
            height: "auto", // Maintain aspect ratio
          }}
        />
      </div>

      <br />
      <div className="flex justify-center items-center gap-1 w-[100%]">
        <button
          onClick={predict}
          className="block m-1 p-[10px 20px] text-2xl cursor-pointer bg-accent text-accent-foreground border-2 w-[100%]"
        >
          {loading ? "Predicting..." : "Predict"} {/* Show loading text */}
        </button>

        <button
          onClick={clearCanvas}
          className="block m-1 p-[10px 20px] text-2xl cursor-pointer bg-red-500 text-white border-2 mt-2 w-[100%]"
        >
          Clear Canvas
        </button>
      </div>

      <div style={{ marginTop: "20px", color: "white" }}>
        <h2>Prediction: {prediction}</h2>
        <h3>Confidence: {confidence * 100}%</h3>
      </div>
    </div>
  );
};

export default Canvas;
