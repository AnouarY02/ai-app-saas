import React from 'react';
import { Button } from '@/components/ui/button';

const FeatureComponent = () => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <p className="mb-2">This is a new feature component.</p>
      <Button className="bg-blue-500 text-white">Click Me</Button>
    </div>
  );
};

export default FeatureComponent;