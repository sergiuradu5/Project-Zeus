import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { toastErr } from "../../utils/toast";
import Spinner from "./Spinner";

type ImageProps = {
  src: string;
  defaultSrc?: string;
  onLoadError?: () => void;
  onLoadSuccess?: () => void;
} & ComponentPropsWithoutRef<"img">;
const ImageComponent = ({
  src,
  className,
  defaultSrc,
  onLoadError,
  onLoadSuccess,
  ...otherProps
}: ImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleLoadError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.onerror = null;
    toastErr("Error loading image, try again later");
    if (defaultSrc) {
      e.currentTarget.src = defaultSrc;
    }
    setImageLoaded(true);
    onLoadError?.();
  }

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = () => {
        setImageLoaded(true);
        onLoadSuccess?.();
      };
      imgRef.current.src = src;
    }
    return () => {
      setImageLoaded(false);
    };
  }, [src, onLoadSuccess]);

  return (
    <div
      className={`
      bg-gray-200
      flex justify-center items-center
      ${!imageLoaded && "cursor-wait"}
      ${className}
      `}
    >
      {!imageLoaded && (
        <Spinner className="border-myBlue border-3 self-center w-[30px] h-[30px]" />
      )}

      <img
        ref={imgRef}
        src={src}
        className={`${!imageLoaded ? "hidden" : "inline-block"}`}
        onError={handleLoadError}
        {...otherProps}
      />
    </div>
  );
};
export default ImageComponent;
