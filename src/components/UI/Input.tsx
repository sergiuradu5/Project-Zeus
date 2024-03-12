import { ComponentPropsWithoutRef } from "react";

type InputProps = {
  placeholder: string;
} & ComponentPropsWithoutRef<"input">;
const Input = ({ placeholder, className, ...otherProps }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={`flex-1 bg-transparent placeholder-gray-300 px-3 py-1 border-2
       border-gray-300 rounded-full focus:border-sky-500 focus:drop-shadow-xl
       transition-all
       ${className}`}
      {...otherProps}
    ></input>
  );
};
export default Input;
