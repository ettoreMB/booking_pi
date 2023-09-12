import { toast } from "react-toastify";

export const toastError = (message) => toast.error(message, {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: "colored"
  });