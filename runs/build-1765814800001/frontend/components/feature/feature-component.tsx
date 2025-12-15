import React from 'react';
import { Button } from '../ui/button';

const FeatureComponent = () => {
  return (
    <div className="border p-4 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Feature Component</h2>
      <p className="mb-4">This is a new feature component.</p>
      <Button>Click Me</Button>
    </div>
  );
};

export default FeatureComponent;