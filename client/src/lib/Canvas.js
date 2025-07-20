"use client";
import axios from "axios";
// components/Canvas.js
import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedImages, setSavedImages] = useState([]);

  // Set up the canvas drawing context
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);

    // Reset path when drawing starts
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Start a new path (new line)
    context.beginPath();
    context.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.strokeStyle = "white";
    context.lineWidth = 25;
    context.lineCap = "round";
    context.lineTo(x, y);
    context.stroke();
  };

  const handleMouseMove = (e) => {
    draw(e);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Get the current image data (canvas)
    const imageDataUrl = canvas.toDataURL("image/png");

    // Create a temporary image element to resize the image
    const img = new Image();
    img.src = imageDataUrl;

    img.onload = () => {
      // Create a new canvas to resize the image to 28x28 pixels (MNIST format)
      const smallCanvas = document.createElement("canvas");
      smallCanvas.width = 28;
      smallCanvas.height = 28;
      const smallContext = smallCanvas.getContext("2d");

      // Draw the original image on the smaller canvas
      smallContext.drawImage(img, 0, 0, 28, 28);

      // Get the pixel data (grayscale) from the small canvas
      const pixelData = smallContext.getImageData(0, 0, 28, 28).data;
      const mnistArray = [];

      // Convert the image data to grayscale values (0-255)
      for (let i = 0; i < pixelData.length; i += 4) {
        // Average the R, G, B channels to get the grayscale value
        const grayscale = pixelData[i]; // R == G == B for grayscale
        mnistArray.push(grayscale / 255); // Normalize to 0-1
      }

      // Update the state using the functional form to append the new image
      setSavedImages((prevImages) => [...prevImages, mnistArray]);
    };
  };

  async function predict() {
    try {
      if (savedImages.length > 0) {
        const res = await axios.post(
          "http://127.0.0.1:8000/predict",
          { input_data: savedImages[0] }
        );
        console.log(res);
      } else {
        console.log("No images to predict");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-col relative">
      <h1 className="text-center text-white pb-2">
        Draw a single Digit on Canvas
      </h1>
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
        }}
      />
      <br />
      <button
        onClick={saveImage}
        className="block m-1 p-[10px 20px] text-2xl cursor-pointer bg-accent text-accent-foreground border-2"
      >
        Save Drawing
      </button>
      <button
        onClick={predict}
        className="block m-1 p-[10px 20px] text-2xl cursor-pointer bg-accent text-accent-foreground border-2"
      >
        Predict
      </button>
      <div style={{ marginTop: "20px", color: "white" }}>
        <h2>Saved Images (MNIST format):</h2>
        <pre>{JSON.stringify(savedImages, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Canvas;
