import React, { useReducer, useState } from "react";
import toast from "react-hot-toast";

interface BankState {
  balance: number;
  transactions: { type: string; amount: number; balance: number }[];
}

type BankAction =
  | { type: "DEPOSIT"; amount: number }
  | { type: "WITHDRAW"; amount: number };

const initialState: BankState = {
  balance: 0,
  transactions: [],
};

const bankReducer = (state: BankState, action: BankAction): BankState => {
  switch (action.type) {
    case "DEPOSIT":
      return {
        ...state,
        balance: state.balance + action.amount,
        transactions: [
          ...state.transactions,
          {
            type: "Deposit",
            amount: action.amount,
            balance: state.balance + action.amount,
          },
        ],
      };
    case "WITHDRAW":
      const updatedBalance =
        state.balance - action.amount >= 0
          ? state.balance - action.amount
          : state.balance; // Prevent negative balance
      return {
        ...state,
        balance: updatedBalance,
        transactions: [
          ...state.transactions,
          {
            type: "Withdraw",
            amount: action.amount,
            balance: updatedBalance,
          },
        ],
      };
    default:
      return state;
  }
};

const BankApp: React.FC = () => {
  const [state, dispatch] = useReducer(bankReducer, initialState);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleDeposit = () => {
    if (amount <= 0) {
      setError("Enter a valid amount greater than zero.");
      return;
    }
    dispatch({ type: "DEPOSIT", amount });
    setError("");
    setAmount(0);
    toast.success("Money deposited!");
  };

  const handleWithdraw = () => {
    if (amount <= 0) {
      setError("Enter a valid amount greater than zero.");
      return;
    }
    if (amount > state.balance) {
      setError("Insufficient balance.");
      return;
    }
    dispatch({ type: "WITHDRAW", amount });
    setError("");
    setAmount(0);
    toast.success("Money withdrawed!");
  };

  return (
    <div className="flex gap-5 h-full">
      <div className="bg-white shadow-md rounded p-4 w-[30%] h-full">
        <h1 className="text-2xl font-bold mb-6">Bank Management System</h1>
        <div className="text-lg mb-4">
          Current Balance:{" "}
          <span className="font-bold text-green-600">
            Rs.{state.balance.toFixed(2)}
          </span>
        </div>
        <input
          type="number"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          className="w-full px-4 py-2 mb-4 rounded text-gray-700 border focus:ring focus:ring-blue-300 outline-none"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex gap-4">
          <button
            onClick={handleDeposit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full transition"
          >
            Deposit
          </button>
          <button
            onClick={handleWithdraw}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full transition"
          >
            Withdraw
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded w-[70%] px-6 py-4">
        <h2 className="text-xl font-bold mb-4">Transaction Log</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Balance</th>
            </tr>
          </thead>
          <tbody>
            {state.transactions.length > 0 ? (
              state.transactions.reverse().map((transaction, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{transaction.type}</td>
                  <td className="py-3 px-4">Rs.{transaction.amount}</td>
                  <td className="py-3 px-4">Rs.{transaction.balance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-3 px-4 text-center text-gray-500">
                  No transactions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankApp;
