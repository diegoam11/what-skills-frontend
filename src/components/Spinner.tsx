import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-24 h-24 border-8",
  };

  // CAMBIO: Reemplazado `cn` por una template literal para unir las clases.
  return (
    <div
      className={`rounded-full animate-spin border-solid border-gray-200 border-t-transparent ${sizeClasses[size]}`}
      style={{ borderTopColor: "#0FBB82" }}
    ></div>
  );
};
