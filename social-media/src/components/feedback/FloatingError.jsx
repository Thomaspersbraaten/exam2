import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/esm/Button";
// Feedback to show when errors happen outside of forms.
function FloatingError({ error, setShowError }) {
  return (
    <div className="floating-modal">
      <Alert className="floating-container" variant="danger">
        <p>{error}</p>
        <Button
          variant="dark"
          className="floating-container__button"
          onClick={() => {
            setShowError(false);
          }}
        >
          Close
        </Button>
      </Alert>
    </div>
  );
}

export default FloatingError;
