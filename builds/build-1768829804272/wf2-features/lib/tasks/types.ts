export interface AITask {
  id: string;
  userId: string;
  title: string;
  status: "pending" | "running" | "completed";
  createdAt: string;
}
