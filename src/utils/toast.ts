import { toast } from "react-toastify";

export const toastErr = (message: string) => {
  toast.error(message);
};

export const toastSucc = (message: string) => {
  toast.success(message);
};

export const toastWarning = (message: string) => {
  toast.warn(message);
};

export const toastInfo = (message: string) => {
  toast.info(message);
};
