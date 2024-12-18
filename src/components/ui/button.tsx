// src/components/ui/button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";  // Added size prop with common options
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  size = "default",  // Default size if not specified
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-blue-500";
  
  const variants = {
    solid: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-100 dark:hover:bg-slate-800",
    ghost: "text-blue-500 hover:bg-blue-100 dark:hover:bg-slate-800 dark:text-blue-400",
  };

  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
    icon: "p-2 w-9 h-9",  // Square aspect ratio for icon buttons
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};