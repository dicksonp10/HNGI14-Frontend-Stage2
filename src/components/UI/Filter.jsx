import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";

const Filter = ({ currentFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  const filters = [
    { value: "all", label: "All" },
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-sm font-bold text-[#0C0E16] dark:text-white hover:text-purple-600 transition-colors"
        aria-label="Filter by status"
      >
        Filter by status
        <FaChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 bg-white dark:bg-dark-200 rounded-lg shadow-lg p-4 min-w-[160px] z-50">
          {filters.map((filter) => (
            <label
              key={filter.value}
              className="flex items-center gap-3 py-2 cursor-pointer text-sm font-bold text-[#0C0E16] dark:text-white capitalize hover:text-purple-600 transition-colors"
            >
              <input
                type="radio"
                name="filter"
                checked={currentFilter === filter.value}
                onChange={() => {
                  onFilterChange(filter.value);
                  setIsOpen(false);
                }}
                className="cursor-pointer accent-purple-600"
              />
              {filter.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
