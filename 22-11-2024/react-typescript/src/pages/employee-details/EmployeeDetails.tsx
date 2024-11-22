import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeById } from "../../services/EmployeeService";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getEmployeeDetails = async () => {
    if (!id) return;
    setLoading(true);
    const data = await fetchEmployeeById(id);
    setEmployee(data);
    setLoading(false);
  };

  useEffect(() => {
    getEmployeeDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Employee not found.</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg h-full">
      <nav className="mb-4">
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={() => navigate(-1)}
        >
          Employees
        </span>{" "}
        {`>`} <span>{employee.name}</span>
      </nav>
      <h2 className="text-xl font-semibold mb-4">{employee.name}'s Details</h2>
      <p>
        <strong>Role:</strong> {employee.role}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Department:</strong> {employee.department}
      </p>
      <p>
        <strong>Joining Date:</strong>{" "}
        {new Date(employee.joiningDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default EmployeeDetails;
