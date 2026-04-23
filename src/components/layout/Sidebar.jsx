import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-[72px] md:w-[103px] bg-[#373B53] dark:bg-dark-200 rounded-r-2xl fixed h-full z-10">
      <div className="bg-purple-600 rounded-r-2xl p-6 md:p-8 text-center relative overflow-hidden">
        <div className="text-white font-bold text-xl md:text-2xl relative z-10">
          INV
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-purple-400 rounded-t-2xl"></div>
      </div>
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={toggleTheme}
          className="cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaMoon size={20} color="#7E88C3" />
          ) : (
            <FaSun size={20} color="#7E88C3" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
