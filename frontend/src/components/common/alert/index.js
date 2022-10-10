// ** Third Party Components
import Swal from "sweetalert2/dist/sweetalert2.js";
export function AlertQuestion({ title, text, callback }) {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#004C6D",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  }).then(callback);
}
export function AlertSuccess({ title, text, callback }) {
  return Swal.fire({
    title,
    text,
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#004C6D",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  }).then(callback);
}
export function AlertPopup({ title, text, callback }) {
  return Swal.fire({
    title,
    text,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  }).then(callback);
}
export function AlertError({ title, text, callback }) {
  return Swal.fire({
    title,
    text,
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#004C6D",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  }).then(callback);
}
