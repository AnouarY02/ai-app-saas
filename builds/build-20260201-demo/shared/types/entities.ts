export type Employee = {
  id: string;
  name: string;
  email: string;
};

export type Shift = {
  id: string;
  employeeId: string;
  startTime: Date;
  endTime: Date;
};
