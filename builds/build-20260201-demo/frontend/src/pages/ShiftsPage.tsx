import React, { useEffect, useState } from 'react';
import { getShifts, Shift } from '../utils/apiClient';

const ShiftsPage = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const data = await getShifts();
      setShifts(data);
    };
    fetchShifts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Shifts</h1>
      <ul className="mt-4">
        {shifts.map(shift => (
          <li key={shift.id} className="border-b py-2">
            Employee ID: {shift.employeeId} - Start: {new Date(shift.startTime).toLocaleString()} - End: {new Date(shift.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftsPage;