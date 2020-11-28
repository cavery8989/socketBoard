import * as React from "react";
import "./button.css";

type ButtonProps = {
  onclick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, onclick }) => {
    const handleClick = (e :React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        onclick()
    }
    return (
        <button className={"button"} onClick={handleClick}>{children}</button>
      );    
} 