import React from "react";
const Button = (props) => {
  return (
    <button
      className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-white-500 m-5 rounded"
      onClick={props.onClick ? props.onClick : null}
    >
      {props.name}
    </button>
  );
};
export default Button;
