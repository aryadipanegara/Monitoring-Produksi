import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:2000";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const shippingId = params.id;
    const response = await axios.put(
      `${API_BASE_URL}/shipping/${shippingId}/status`,
      {
        status: "Dikirim",
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating Shipping status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const produkId = params.id;
    const response = await axios.delete(`${API_BASE_URL}/shipping/${produkId}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting Produk" },
      { status: 500 }
    );
  }
}
