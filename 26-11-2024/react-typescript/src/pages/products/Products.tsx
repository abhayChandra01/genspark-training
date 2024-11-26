import React, { useState } from "react";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

const Products: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    quantity: 0,
  });
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: name === "name" ? value : +value });
  };

  const handleAddProduct = () => {
    setProductsList([...productsList, product]);
    setProduct({ name: "", price: 0, quantity: 0 });
    setTotalAmount(null);
  };

  const calculateTotalAmount = () => {
    setTotalAmount(product.price * product.quantity);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Product Details</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-2"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-medium mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            placeholder="Enter quantity"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Product
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              calculateTotalAmount();
            }}
            className="text-blue-500 underline"
          >
            Calculate Total Amount
          </a>
        </div>
        {totalAmount !== null && (
          <p className="mt-4 text-green-500 font-medium">
            Total Amount: {totalAmount}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Product Name
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Price
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Quantity
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-4 py-2 text-gray-800">{item.name}</td>
                <td className="px-4 py-2 text-gray-800">${item.price}</td>
                <td className="px-4 py-2 text-gray-800">{item.quantity}</td>
                <td className="px-4 py-2 text-gray-800">
                  ${item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
