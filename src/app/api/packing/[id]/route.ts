import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packingId = params.id;
    const response = await axios.get(`${API_BASE_URL}/packing/${packingId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching material" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packingId = params.id;
    const response = await axios.delete(`${API_BASE_URL}/packing/${packingId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting packing" },
      { status: 500 }
    );
  }
}
