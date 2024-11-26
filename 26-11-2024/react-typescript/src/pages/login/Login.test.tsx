import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login Component", () => {
  test("displays error if email is not supplied", () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", {
      name: "Login",
    });

    fireEvent.click(submitButton);

    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });

  test("displays error if password is not supplied", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByRole("button", {
      name: "Login",
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("Password is required.")).toBeInTheDocument();
  });

  test("does not display errors when both email and password are supplied", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const submitButton = screen.getByRole("button", {
      name: "Login",
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(screen.queryByText("Email is required.")).not.toBeInTheDocument();
    expect(screen.queryByText("Password is required.")).not.toBeInTheDocument();
  });
});
