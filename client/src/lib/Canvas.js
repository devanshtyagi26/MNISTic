"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedImages, setSavedImages] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoords = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    return { x, y };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { x, y } = getCoords(e, canvas);
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
    const { x, y } = getCoords(e, canvas);

    context.strokeStyle = "white";
    context.lineWidth = 25;
    context.lineCap = "round";
    context.lineTo(x, y);
    context.stroke();
  };

  // Touch support
  const handleTouchStart = (e) => {
    e.preventDefault();
    startDrawing(e);
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
    draw(e);
  };
  const handleTouchEnd = () => stopDrawing();

  const handleMouseMove = (e) => draw(e);

  const saveImage = async () => {
    const canvas = canvasRef.current;
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
          const grayscale = pixelData[i];
          mnistArray.push(grayscale / 255);
        }

        setSavedImages([mnistArray]);
        resolve();
      };
    });
  };

  useEffect(() => {
    const makePrediction = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (savedImages.length > 0) {
      makePrediction();
    }
  }, [savedImages]);

  const predict = async () => {
    await saveImage();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction("");
    setConfidence("");
    setSavedImages([]);
  };

  return (
    <div className="flex flex-col relative items-center">
      <h1 className="text-center text-white pb-2">
        Draw a single Digit on Canvas
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: "350px",
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            border: "2px solid white",
            cursor: "crosshair",
            width: "100%",
            height: "auto",
            touchAction: "none", // Important to disable default gestures
          }}
        />
      </div>

      <div className="flex justify-center items-center gap-1 w-full mt-3">
        <button
          onClick={predict}
          className="block p-[10px_20px] text-2xl cursor-pointer bg-accent text-accent-foreground border-2 w-full"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
        <button
          onClick={clearCanvas}
          className="block p-[10px_20px] text-2xl cursor-pointer bg-red-500 text-white border-2 w-full"
        >
          Clear
        </button>
      </div>

      <div style={{ marginTop: "20px", color: "white" }}>
        <h2>Prediction: {prediction}</h2>
        <h3>Confidence: {confidence && (confidence * 100).toFixed(2)}%</h3>
      </div>
    </div>
  );
};

export default Canvas;
