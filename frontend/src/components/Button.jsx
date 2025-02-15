export default function Button({ variant = "default", className = "",onClick, children, ...props }) {
    const variants = {
      default: "bg-primary text-black px-4 py-2 rounded",
      outline: "border border-primary text-primary px-4 py-2 rounded",
      ghost: "text-primary px-4 py-2",
    };
  
    return (
      <button onClick={onClick} className={`${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }