import { Habit } from "./types";
import { v4 as uuidv4 } from "uuid";

// In-memory store for habits, keyed by userId
const habitStore: Record<string, Habit[]> = {};

export function getHabits(userId: string): Habit[] {
  return habitStore[userId] || [];
}

export function getHabit(userId: string, habitId: string): Habit | undefined {
  return getHabits(userId).find((h) => h.id === habitId);
}

export function addHabit(userId: string, data: { name: string; description?: string }): Habit {
  const habit: Habit = {
    id: uuidv4(),
    userId,
    name: data.name,
    description: data.description,
    createdAt: new Date().toISOString(),
    streak: 0,
    lastCompleted: null
  };
  habitStore[userId] = [...(habitStore[userId] || []), habit];
  return habit;
}

export function updateHabit(userId: string, habitId: string, data: { name?: string; description?: string }): Habit | undefined {
  const habits = getHabits(userId);
  const idx = habits.findIndex((h) => h.id === habitId);
  if (idx === -1) return undefined;
  const updated: Habit = {
    ...habits[idx],
    ...data
  };
  habits[idx] = updated;
  habitStore[userId] = habits;
  return updated;
}

export function completeHabit(userId: string, habitId: string): Habit | undefined {
  const habit = getHabit(userId, habitId);
  if (!habit) return undefined;
  const today = new Date().toISOString().slice(0, 10);
  const last = habit.lastCompleted ? habit.lastCompleted.slice(0, 10) : null;
  if (last === today) return habit; // already completed today
  // If last completed was yesterday, increment streak; else reset
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newStreak = last === yesterday ? habit.streak + 1 : 1;
  habit.streak = newStreak;
  habit.lastCompleted = new Date().toISOString();
  return habit;
}

export function deleteHabit(userId: string, habitId: string): boolean {
  const habits = getHabits(userId);
  const filtered = habits.filter((h) => h.id !== habitId);
  habitStore[userId] = filtered;
  return habits.length !== filtered.length;
}
