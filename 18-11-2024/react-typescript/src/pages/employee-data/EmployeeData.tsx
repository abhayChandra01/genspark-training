import React, { useState } from "react";
import EmployeeTable from "../../component/employee-table/EmployeeTable";
import EmployeeModal from "../../component/employee-modal/EmployeeModal";
import toast from "react-hot-toast";
import { Employee } from "../../models/Employee";

const EmployeeData: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Abhay Chandra",
      email: "abhay@example.com",
      role: "Frontend Developer",
    },
    {
      id: 2,
      name: "Narasimha Rao",
      email: "narasimha@example.com",
      role: "Trainer - Genspark",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleSaveEmployee = (employee: Employee) => {
    if (isEdit) {
      let updatedEmployees: Employee[] = employees.map((emp) =>
        emp.id === employee.id ? { ...employee } : emp
      );

      setEmployees(updatedEmployees);
      toast.success("Employee updated successfully!");
    } else {
      setEmployees([...employees, { ...employee, id: employees.length + 1 }]);
      toast.success("Employee added successfully!");
    }
    closeModal();
  };

  const handleDeleteEmployee = (id: number) => {
    if (window.confirm("Are you sure? This action can't be undone.") === true) {
      let filteredEmployees: Employee[] = employees.filter(
        (employee) => employee.id !== id
      );

      setEmployees(filteredEmployees);
      toast.error("Employee deleted!");
    }
  };

  const openModal = (employee: Employee | null) => {
    if (employee) {
      setCurrentEmployee(employee);
      setIsEdit(true);
    } else {
      setCurrentEmployee(null);
      setIsEdit(false);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentEmployee(null);
    setIsEdit(false);
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Employee Management</h1>
        <button
          onClick={() => openModal(null)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Add Employee
        </button>
      </div>
      <EmployeeTable
        employees={employees}
        onEdit={openModal}
        onDelete={handleDeleteEmployee}
      />
      {modalOpen && (
        <EmployeeModal
          employee={currentEmployee}
          onSave={handleSaveEmployee}
          onClose={closeModal}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default EmployeeData;
