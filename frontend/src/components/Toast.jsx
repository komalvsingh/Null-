import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-hide after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer type={type}>
      {message}
    </ToastContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) => (type === "success" ? "#4CAF50" : "#FF4D4D")};
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

export default Toast;
