import { NextResponse } from "next/server";

export async function POST(request) {
  const URI = process.env.NEXT_PUBLIC_API_URL;
  try {
    // 1. Grab the JSON array payload from the canvas browser component
    const body = await request.json();

    // 2. Safely proxy it across the internal network to the Python container
    // Note: If your app name isn't crystalogix, swap 'crystalogix-backend' with your backend service name
    const response = await fetch(`${URI}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // 3. Handle downstream model execution failures cleanly
    if (!response.ok) {
      const errorDetails = await response.text();
      return NextResponse.json(
        { error: "Model processing failed", details: errorDetails },
        { status: response.status },
      );
    }

    // 4. Return the prediction and confidence ratings to the browser
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Canvas Proxy Routing Error:", error);
    return NextResponse.json(
      { error: "Internal Gateway Routing Failure", details: error.message },
      { status: 500 },
    );
  }
}
