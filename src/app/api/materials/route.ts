import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:2000";

// Mendapatkan daftar material
export async function GET() {
  try {
    const response = await axios.get(`${API_BASE_URL}/material`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching materials" },
      { status: 500 }
    );
  }
}

// Menambahkan material baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(`${API_BASE_URL}/material`, body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding material" },
      { status: 500 }
    );
  }
}
