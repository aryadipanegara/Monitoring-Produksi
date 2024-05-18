import React from "react";
import {
  Container,
  Table,
  Button,
  Group,
  Text,
  Pagination,
} from "@mantine/core";
import { FaFilter } from "react-icons/fa";
import { MaterialItem } from "../data/material";

interface Props {
  data: MaterialItem[];
}

const MaterialTable: React.FC<Props> = ({ data }) => {
  return (
    <Container className="bg-[#3E3B64] p-6 rounded-lg">
      <Group mb="lg">
        <Text className="text-2xl font-semibold text-white">
          Stok Barang Mentah
        </Text>
        <Button
          leftSection={<FaFilter />}
          variant="light"
          className="bg-blue-500 text-white"
        >
          Filter
        </Button>
      </Group>
      <div className="overflow-x-auto">
        <Table
          striped
          highlightOnHover
          className="bg-[#3E3B64] text-white rounded-lg"
        >
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-6">No.</th>
              <th className="py-3 px-6">Nama</th>
              <th className="py-3 px-6">Kuantitas</th>
              <th className="py-3 px-6">Jumlah</th>
              <th className="py-3 px-6">Tanggal Masuk</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{item.NamaBarang}</td>
                <td className="py-3 px-6">{item.Kuantitas}</td>
                <td className="py-3 px-6">{item.saldoakhir}</td>
                <td className="py-3 px-6">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default MaterialTable;
