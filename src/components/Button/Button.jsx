import React from "react";
import style from "./Button.module.css";
const Button = ({ text, onClick,loading  }) => {
  return (
    <button onClick={onClick} className={`${style.button} root_button`}>
      <span>{loading!==undefined
                  ?loading
                  ?"Loading...":text:''
              }
        </span>
    </button>
  );
};

export default Button;
