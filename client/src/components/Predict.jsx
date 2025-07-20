import Canvas from "@/lib/Canvas";
import React from "react";
import { Card } from "./ui/card";

function Predict() {
  return (
    <div className="flex flex-col gap-2 w-[100%] h-[100%] justify-center items-center">
      <Card className="w-[550px]  flex justify-center items-center">
        <Canvas />
      </Card>
    </div>
  );
}

export default Predict;
