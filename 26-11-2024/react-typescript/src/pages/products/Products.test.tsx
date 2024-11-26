import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Products from "./Products";

describe("Products Component", () => {
  test("renders input fields and buttons correctly", () => {
    console.log("SSS");
    render(<Products />);
    console.log("SSS");
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter quantity")).toBeInTheDocument();

    expect(screen.getByText("Add Product")).toBeInTheDocument();
    expect(screen.getByText("Calculate Total Amount")).toBeInTheDocument();
  });

  test("allows user to input product name, price, and quantity", () => {
    render(<Products />);
    const nameInput =
      screen.getByPlaceholderText<HTMLInputElement>("Enter name");
    const priceInput =
      screen.getByPlaceholderText<HTMLInputElement>("Enter price");
    const quantityInput =
      screen.getByPlaceholderText<HTMLInputElement>("Enter quantity");

    fireEvent.change(nameInput, { target: { value: "Laptop" } });
    fireEvent.change(priceInput, { target: { value: "1000" } });
    fireEvent.change(quantityInput, { target: { value: "2" } });

    expect(nameInput.value).toBe("Laptop");
    expect(priceInput.value).toBe("1000");
    expect(quantityInput.value).toBe("2");
  });

  test("renders hyperlink to calculate total amount", () => {
    render(<Products />);
    expect(screen.getByText("Calculate Total Amount")).toBeInTheDocument();
  });

  test("calculates and displays total amount when hyperlink is clicked", () => {
    render(<Products />);
    const priceInput =
      screen.getByPlaceholderText<HTMLInputElement>("Enter price");
    const quantityInput =
      screen.getByPlaceholderText<HTMLInputElement>("Enter quantity");
    const calculateLink = screen.getByText<HTMLAnchorElement>(
      "Calculate Total Amount"
    );

    fireEvent.change(priceInput, { target: { value: "1000" } });
    fireEvent.change(quantityInput, { target: { value: "2" } });
    fireEvent.click(calculateLink);

    expect(screen.getByText("Total Amount: 2000")).toBeInTheDocument();
  });

  test("clears total amount when a new product is added", () => {
    render(<Products />);
    const nameInput =
      screen.getByPlaceholderText<HTMLInputElement>("Enter name");
    const priceInput =
      screen.getByPlaceholderText<HTMLInputElement>("Enter price");
    const quantityInput =
      screen.getByPlaceholderText<HTMLInputElement>("Enter quantity");
    const calculateLink = screen.getByText<HTMLAnchorElement>(
      "Calculate Total Amount"
    );
    const addButton = screen.getByText<HTMLButtonElement>("Add Product");

    fireEvent.change(nameInput, { target: { value: "Laptop" } });
    fireEvent.change(priceInput, { target: { value: "1000" } });
    fireEvent.change(quantityInput, { target: { value: "2" } });
    fireEvent.click(calculateLink);

    expect(screen.getByText("Total Amount: 2000")).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(screen.queryByText("Total Amount: 2000")).not.toBeInTheDocument();
  });
});
