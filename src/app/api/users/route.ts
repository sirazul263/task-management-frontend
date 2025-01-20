// app/api/external-api/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const api = process.env.API_URL;
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;
    // Fetch data from the external API
    const response = await fetch(`${api}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        // Include any headers required by the external API
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
