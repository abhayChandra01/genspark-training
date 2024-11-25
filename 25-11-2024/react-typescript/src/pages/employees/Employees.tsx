import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/EmployeeService";
import { Employee } from "../../models/EmployeeModel";
import EmpList from "../../component/employee-list/EmployeeList";
import EmployeeModal from "../../component/employee-modal/EmployeeModal";
import toast from "react-hot-toast";

const Employees: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery("employees", fetchEmployees);

  const addMutation = useMutation(addEmployee, {
    onSuccess: () => queryClient.invalidateQueries("employees"),
  });

  const updateMutation = useMutation(updateEmployee, {
    onSuccess: () => queryClient.invalidateQueries("employees"),
  });

  const deleteMutation = useMutation(deleteEmployee, {
    onSuccess: () => queryClient.invalidateQueries("employees"),
  });

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSave = (employee: Employee) => {
    if (employee.id) {
      updateMutation.mutate(employee);
      toast.success("Updated successfully!");
    } else {
      addMutation.mutate({ ...employee, id: Date.now() });
      toast.success("Added successfully!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure? This action can't be undone.") === true) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Add Employee
        </button>
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching employees!</div>}
      {employees && (
        <EmpList
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={selectedEmployee}
        onSave={handleSave}
      />
    </div>
  );
};

export default Employees;
