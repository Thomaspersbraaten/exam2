import Alert from "react-bootstrap/Alert";
// Error to show mostly inside forms
function ErrorMessage({ variant, message }) {
  return <Alert variant={variant}>{message}</Alert>;
}

export default ErrorMessage;
