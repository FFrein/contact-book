import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast(message: string, bgColor:string = "#ffffff", textColor:string = "#000000"): void {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "bottom", 
    position: "right", 
    close: true,
    style: {
      color: textColor,
      background:bgColor,
    }
  }).showToast();
}