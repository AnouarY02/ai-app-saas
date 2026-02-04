const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000';

function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {})
  };
}

export interface Employee {
  id: string;
  name: string;
  email: string;
}

export interface Shift {
  id: string;
  employeeId: string;
  startTime: Date;
  endTime: Date;
}

export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(`${API_URL}/api/employees`, { headers: getAuthHeaders() });
  return response.json();
}

export async function createEmployee(data: { name: string; email: string }): Promise<Employee> {
  const response = await fetch(`${API_URL}/api/employees`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function getShifts(): Promise<Shift[]> {
  const response = await fetch(`${API_URL}/api/shifts`, { headers: getAuthHeaders() });
  return response.json();
}

export async function createShift(data: { employeeId: string; startTime: Date; endTime: Date }): Promise<Shift> {
  const response = await fetch(`${API_URL}/api/shifts`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  return response.json();
}