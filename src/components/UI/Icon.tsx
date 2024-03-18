import { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";
import themeConstants from "../../theme/theme-constants";
import { Link } from "react-router-dom";

type IconProps = {
  IconName: IconType;
  loading?: boolean;
  ping?: boolean;
  reduceOpacityOnHover?: boolean;
  size?: number;
  to?: string;
} & ComponentPropsWithoutRef<"button">;

const Icon = ({
  IconName,
  loading,
  size,
  ping,
  reduceOpacityOnHover,
  to,
  className,
  ...otherProps
}: IconProps) => {
  const iconComponent = <IconName size={size ?? themeConstants.iconSize} />;
  const pingComponent = (
    <>
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="relative inline-flex rounded-full h-3 w-3 bg-myPink border-2 border-gray-800"></span>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-myPink opacity-75"></span>
      </span>
    </>
  );

  const renderComponent = (
    <button
      disabled={loading}
      className={`relative p-3 rounded-full cursor-pointer hover:bg-myBlueDark
  ${
    reduceOpacityOnHover
      ? "hover:bg-opacity-3o"
      : "bg-myBlue text-white border-2 border-white hover:drop-shadow-lg"
  }
  ${loading && "cursor-wait"}
  ${className}`}
      {...otherProps}
    >
      {loading ? (
        "Loading"
      ) : (
        <div>
          {iconComponent}
          {ping && pingComponent}
        </div>
      )}
    </button>
  );

  return to ? <Link to={to}>{renderComponent}</Link> : renderComponent;
};
export default Icon;
