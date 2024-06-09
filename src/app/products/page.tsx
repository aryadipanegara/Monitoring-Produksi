"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Loader, Alert, Title, Button } from "@mantine/core";
import AddProductModal from "../../components/modal/produkModal";
import { Produk } from "../../interfaces/product";

const ProductsPage = () => {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latestNewProduct, setLatestNewProduct] = useState<Produk | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/produk");
        setProduk(response.data);
        identifyLatestNewProduct(response.data);
      } catch (error) {
        setError("Error fetching produk: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const isNewProduct = (createdAt: string): boolean => {
    const productCreatedAt = new Date(createdAt);
    const now = new Date();
    const differenceInDays = Math.ceil(
      (now.getTime() - productCreatedAt.getTime()) / (1000 * 3600 * 24)
    );
    return differenceInDays <= 7; // Menandai produk yang dibuat dalam 7 hari terakhir sebagai produk baru
  };

  const identifyLatestNewProduct = (products: Produk[]): void => {
    const latestNewProductMap: Record<string, Produk> = {};

    products.forEach((product) => {
      if (!latestNewProductMap[product.nama]) {
        latestNewProductMap[product.nama] = product;
      } else {
        const existingProduct = latestNewProductMap[product.nama];
        if (new Date(existingProduct.createdAt) < new Date(product.createdAt)) {
          latestNewProductMap[product.nama] = product;
        }
      }
    });

    let latestNew: Produk | null = null;
    Object.values(latestNewProductMap).forEach((product) => {
      if (isNewProduct(product.createdAt)) {
        if (!latestNew) {
          latestNew = product;
        } else {
          if (new Date(latestNew.createdAt) < new Date(product.createdAt)) {
            latestNew = product;
          }
        }
      }
    });

    setLatestNewProduct(latestNew);
  };

  const sortedProducts = [...produk].sort((a, b) => {
    // Mengurutkan produk berdasarkan tanggal dan waktu terbaru
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-6 text-black">
        <Title order={1}>Daftar Produk</Title>
        <Button onClick={openModal}>Buat Produk</Button>
        <AddProductModal visible={isModalOpen} onClose={closeModal} />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <Card shadow="sm" className="border rounded-lg p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Produk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Berat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jumlah Dibuat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material Yang Digunakan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((p: Produk) => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {p.nama}
                      {latestNewProduct && latestNewProduct.nama === p.nama && (
                        <span className="inline-block bg-green-500 text-white text-xs uppercase font-semibold px-2 py-1 rounded-md ml-2">
                          NEW
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.berat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.jumlah_total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <ul className="list-disc list-inside">
                        {p.material_pendukung.map((mp) => (
                          <li key={mp.id}>
                            {mp.nama} (Jumlah: {mp.jumlah})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(p.updatedAt).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductsPage;
