import { demos } from './store';
import { DemoPage } from './types';

export async function getDemos(limit?: number): Promise<DemoPage[]> {
  return limit ? demos.slice(0, limit) : demos;
}

export async function getDemoById(id: string): Promise<DemoPage | undefined> {
  return demos.find(d => d.id === id);
}

