import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 font-semibold rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    solid: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
    ghost: "text-blue-500 hover:bg-blue-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};