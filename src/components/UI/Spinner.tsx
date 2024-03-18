import { ComponentPropsWithoutRef } from "react";

type SpinnerProps = ComponentPropsWithoutRef<"div">;
const Spinner = (props: SpinnerProps) => {
  return (
    <div
      className={`animate-spin border-2 border-t-transparent w-5 h-5 rounded-full ${props.className}`}
    ></div>
  );
};
export default Spinner;
