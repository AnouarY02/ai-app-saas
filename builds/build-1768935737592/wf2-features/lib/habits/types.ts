export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: string;
  streak: number;
  lastCompleted: string | null;
}

export interface HabitStreak {
  habitId: string;
  streak: number;
  lastCompleted: string | null;
}
