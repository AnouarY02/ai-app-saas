import React from 'react';
import { Button } from '@/components/ui/button';

const FeatureComponent = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Feature Component</h2>
      <p className="mb-4">This is a new feature component.</p>
      <Button className="bg-blue-500 text-white">Click Me</Button>
    </div>
  );
};

export default FeatureComponent;