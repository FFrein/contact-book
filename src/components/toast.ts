import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast(message: string, bgColor:string = "white", textColor:string = "black"): void {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "bottom", 
    position: "right", 
    close: true,
    style: {
      color: textColor,
      background:bgColor,
      borderRadius:"6px",
    }
  }).showToast();
}