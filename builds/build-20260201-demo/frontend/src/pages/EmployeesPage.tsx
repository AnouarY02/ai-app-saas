import React, { useEffect, useState } from 'react';
import { getEmployees, Employee } from '../utils/apiClient';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Employees</h1>
      <ul className="mt-4">
        {employees.map(employee => (
          <li key={employee.id} className="border-b py-2">
            {employee.name} - {employee.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesPage;