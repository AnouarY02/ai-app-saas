import { features } from './store';
import { Feature } from './types';

export async function getFeatures(limit?: number): Promise<Feature[]> {
  return limit ? features.slice(0, limit) : features;
}

export async function getFeatureById(id: string): Promise<Feature | undefined> {
  return features.find(f => f.id === id);
}

