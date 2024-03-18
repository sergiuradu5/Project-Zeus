import { ComponentPropsWithoutRef } from "react";
import Spinner from "./Spinner";

type ButtonProps = {
  loading?: boolean;
  secondary?: boolean;
} & ComponentPropsWithoutRef<"button">;
const Button = ({
  className,
  secondary = false,
  loading = false,
  children,
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      className={`flex flex-row justify-center items-center gap-3 py-2 px-9 rounded-full text-white border-2 border-white transition-all
      hover:drop-shadow-lg
      ${
        secondary
          ? "bg-myPink hover:bg-myPinkDark"
          : "bg-myBlue hover:bg-myBlueDark"
      }
      ${loading ? "cursor-wait" : ""}
      ${className}`}
      disabled={loading}
      {...otherProps}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};
export default Button;
