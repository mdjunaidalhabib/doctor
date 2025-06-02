"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDarkMode } from "../context/DarkModeProvider";

export default function DarkModeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative ml-auto px-3 py-2 text-white rounded-xl hover:bg-gray-700 transition-all z-50 flex items-center space-x-2"
    >
      {isDarkMode ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
}
