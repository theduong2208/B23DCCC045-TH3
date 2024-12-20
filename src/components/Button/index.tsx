import React, { ReactNode } from "react";
import "./index.css";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  size = "medium",
  style,
}) => {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${disabled ? "" : className} ${size}`}
    >
      {children}
    </button>
  );
};

export default Button;
