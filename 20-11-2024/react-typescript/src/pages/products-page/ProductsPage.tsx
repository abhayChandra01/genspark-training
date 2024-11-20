import React, { useReducer, useState } from "react";
import toast from "react-hot-toast";

interface CartItem {
  ProductId: number;
  ProductName: string;
  UnitPrice: number;
  Quantity: number;
  Total: number;
}

interface CartState {
  cartArray: CartItem[];
}

type Action =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | {
      type: "UPDATE_QUANTITY";
      payload: { ProductId: number; quantity: number };
    };

const initialState: CartState = {
  cartArray: [],
};

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const newItem = action.payload;
      const existingItemIndex = state.cartArray.findIndex(
        (item) => item.ProductId === newItem.ProductId
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cartArray];
        updatedCart[existingItemIndex].Quantity += 1;
        updatedCart[existingItemIndex].Total =
          updatedCart[existingItemIndex].UnitPrice *
          updatedCart[existingItemIndex].Quantity;
        return { ...state, cartArray: updatedCart };
      } else {
        newItem.Quantity = 1;
        newItem.Total = newItem.UnitPrice * newItem.Quantity;
        return { ...state, cartArray: [...state.cartArray, newItem] };
      }
    case "REMOVE_ITEM":
      const filteredCart = state.cartArray.filter(
        (item) => item.ProductId !== action.payload
      );
      return { ...state, cartArray: filteredCart };
    case "UPDATE_QUANTITY":
      const updatedQuantityCart = state.cartArray.map((item) =>
        item.ProductId === action.payload.ProductId
          ? {
              ...item,
              Quantity: action.payload.quantity,
              Total: item.UnitPrice * action.payload.quantity,
            }
          : item
      );
      return { ...state, cartArray: updatedQuantityCart };
    default:
      return state;
  }
};

const productList = [
  { ProductId: 1025, ProductName: "Printer", UnitPrice: 2560 },
  { ProductId: 1026, ProductName: "Monitor", UnitPrice: 1200 },
  { ProductId: 1027, ProductName: "Keyboard", UnitPrice: 800 },
];

const ProductsPage: React.FC = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const total = state.cartArray.reduce((sum, item) => sum + item.Total, 0);
  const grandTotal = total;

  const handleAddToCart = (product: {
    ProductId: number;
    ProductName: string;
    UnitPrice: number;
  }) => {
    const newItem: CartItem = {
      ProductId: product.ProductId,
      ProductName: product.ProductName,
      UnitPrice: product.UnitPrice,
      Quantity: 1,
      Total: product.UnitPrice,
    };
    dispatch({ type: "ADD_ITEM", payload: newItem });
    toast.success("Item added successfully!");
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
    toast.error("Item removed successfully!");
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleUpdateQuantity = (
    productId: number,
    action: "increment" | "decrement"
  ) => {
    const item = state.cartArray.find((item) => item.ProductId === productId);
    if (item) {
      const newQuantity =
        action === "increment" ? item.Quantity + 1 : item.Quantity - 1;
      if (newQuantity > 0) {
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { ProductId: productId, quantity: newQuantity },
        });
      }
    }

    toast.success("Item updated successfully!");
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-xl font-bold">Products</h1>

      <div className="space-y-4 mt-4">
        {productList.map((product) => {
          const cartItem = state.cartArray.find(
            (item) => item.ProductId === product.ProductId
          );

          return (
            <div
              key={product.ProductId}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{product.ProductName}</span>
              <span>Price: ${product.UnitPrice}</span>
              <div className="flex items-center space-x-2">
                {!cartItem ? (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(product.ProductId, "decrement")
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{cartItem.Quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(product.ProductId, "increment")
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleToggleCart}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        View Cart
      </button>

      {isCartOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-fit">
            <h2 className="text-2xl font-bold">Cart</h2>

            {/* Cart Table */}
            <table className="min-w-full table-auto text-left mt-4">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cartArray.map((item, index) => (
                  <tr
                    key={item.ProductId}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2">{item.ProductName}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.ProductId, "decrement")
                          }
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{item.Quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.ProductId, "increment")
                          }
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">${item.Total}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveFromCart(item.ProductId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {state.cartArray?.length === 0 ? (
              <div className="mt-2 text-center">No Items Available</div>
            ) : null}

            <div className="mt-4">
              <div className="flex justify-between font-bold mt-2">
                <span>Grand Total:</span>
                <span>${grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handleToggleCart}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
