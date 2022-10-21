// ** Third Party Components
import Swal from "sweetalert2/dist/sweetalert2.js";
import theme from "../../../shared/theme";
export function AlertQuestion({ title, text, callback }) {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: theme.main,
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
    confirmButtonColor: "#1F3E82",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  }).then(callback);
}
export function AlertPopup({ title, text, timer = 3000, callback }) {
  return Swal.fire({
    title,
    text,
    icon: "success",
    showConfirmButton: false,
    timer: timer,
  }).then(callback);
}
export function AlertError({ title, text, callback }) {
  return Swal.fire({
    title,
    text,
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#1F3E82",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  }).then(callback);
}
export function AlertErrorPopup({ title, text, callback }) {
  return Swal.fire({
    title,
    text,
    icon: "error",
    showConfirmButton: false,
    timer: 2000,
  }).then(callback);
}
