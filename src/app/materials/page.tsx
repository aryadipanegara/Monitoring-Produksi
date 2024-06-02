"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Material } from "../../interfaces/material";
import { Card, Loader, Alert, Title, Button } from "@mantine/core";
import AddMaterialModal from "../../components/modal/materialModal";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/materials");
        setMaterials(response.data);
      } catch (error) {
        setError("Error fetching materials: " + error);
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between mb-6 text-white">
        <Title order={1}>Daftar Material</Title>

        <Button onClick={openModal}>Add Material</Button>

        <AddMaterialModal visible={isModalOpen} onClose={closeModal} />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <Card key={material.id} shadow="sm" className="border rounded-lg">
              <Title order={2}>{material.nama}</Title>
              <p>Satuan: {material.satuan}</p>
              <p>Jumlah: {material.jumlah}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;
