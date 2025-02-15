import React from "react";
const Alert = ({ children, variant = "default", className, ...props }) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    success: "bg-green-100 text-green-800",
  };

  return (
    <div
      role="alert"
      className={`relative rounded-lg p-4 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDescription = ({ className, ...props }) => {
  return <div className={`text-sm ${className}`} {...props} />;
};

export { Alert, AlertDescription };
