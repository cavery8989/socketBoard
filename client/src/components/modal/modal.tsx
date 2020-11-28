import * as React from "react";
import './modal.css'
export const Modal: React.FC = ({ children }) => {
  return <div className="modal">{children}</div>;
};
