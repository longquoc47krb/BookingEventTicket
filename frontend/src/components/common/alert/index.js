// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function SWAlert(props) {
  const { title, text, status, callback } = props;
  return Swal.fire({
    title,
    text,
    icon: status,
    showCancelButton: true,
    confirmButtonColor: "#004C6D",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK",
  }).then(callback);
}
