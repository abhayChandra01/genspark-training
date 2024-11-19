import React, { useState } from "react";
import { Product } from "../../models/ProductModel";
import useStorage from "../../hooks/useStorage";
import ProductModal from "../../component/product-modal/ProductModal";

export default function CustomHookPage() {
  const {
    items: products,
    add,
    remove,
    update,
  } = useStorage<Product>("products");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleAdd = (product: Product) => {
    add(product);
    setModalOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleUpdate = (product: Product) => {
    update(product);
    setEditProduct(null);
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure? This action can't be undone!") === true) {
      remove(id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-blue-50 transition duration-200"
              >
                <td className="px-6 py-4 text-sm">{product.name}</td>
                <td className="px-6 py-4 text-sm">{product.price}</td>
                <td className="px-6 py-4 text-sm">{product.category}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products?.length === 0 ? (
        <div className="mt-20 text-center">No products to show!</div>
      ) : null}

      {modalOpen && (
        <ProductModal
          product={editProduct}
          onSave={editProduct ? handleUpdate : handleAdd}
          onClose={() => {
            setModalOpen(false);
            setEditProduct(null);
          }}
          isEdit={!!editProduct}
        />
      )}
    </div>
  );
}
