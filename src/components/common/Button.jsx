import React from "react";

const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) => {
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-400 text-white",
    secondary:
      "bg-gray-200 dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:opacity-80",
    danger: "bg-red-500 hover:bg-red-400 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-bold transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
