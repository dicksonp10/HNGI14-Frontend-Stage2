import React from "react";

const Input = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm text-gray-500 dark:text-gray-400 mb-2 font-bold"
        >
          {label} {required && "*"}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-lg dark:bg-dark-300 dark:border-gray-700 dark:text-white transition-all focus:outline-none focus:border-purple-600 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
