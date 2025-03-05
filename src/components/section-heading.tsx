import React from 'react';

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
      {children}
    </h2>
  );
}

export default SectionHeading;
