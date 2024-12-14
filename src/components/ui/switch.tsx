import React from "react";

type SwitchProps = {
  checked: boolean; // Whether the switch is on/off
  onCheckedChange: (checked: boolean) => void; // Function to toggle the switch
  className?: string; // Optional class for styling
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  className = "",
}) => {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
        checked ? "bg-blue-500" : "bg-gray-300"
      } ${className}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
};