// app/api/external-api/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const api = process.env.API_URL;
    const requestBody = await request.json();
    // Fetch data from the external API
    const response = await fetch(`${api}/login`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // Include any headers required by the external API
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
