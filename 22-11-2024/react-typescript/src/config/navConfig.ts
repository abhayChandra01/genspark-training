export type UserRole = "ADMIN" | "USER";

export const navConfig: Record<UserRole, { label: string; path: string }[]> = {
  ADMIN: [
    { label: "Employees", path: "/employees" },
    { label: "Departments", path: "/departments" },
  ],
  USER: [{ label: "Departments", path: "/departments" }],
};
