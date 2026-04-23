import React from "react";

const EmptyState = () => {
  return (
    <div className="text-center py-12 md:py-20">
      <div className="text-5xl md:text-6xl mb-4">📄</div>
      <h3 className="text-lg md:text-xl font-bold text-[#0C0E16] dark:text-white mb-2">
        There is nothing here
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
        Create an invoice by clicking the
        <br />
        New Invoice button and get started
      </p>
    </div>
  );
};

export default EmptyState;
