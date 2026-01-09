import React from 'react';
import { NewFeatureComponent } from '@/components/new-feature/new-feature-component';

const NewFeaturePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Feature</h1>
      <NewFeatureComponent />
    </div>
  );
};

export default NewFeaturePage;