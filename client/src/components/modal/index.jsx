import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalConfirmationVerticallyCenter(props) {
  const { handleConfirmAction, title, ...otherProps } = props;
  return (
    <Modal
      {...otherProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Annuler
        </Button>
        <Button
          variant="success"
          onClick={() => handleConfirmAction(props.onHide)}
        >
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function ModalConfirmation(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const { sizeButton, variantButton, buttonText, ...otherProps } = props;

  return (
    <>
      <Button
        variant={variantButton}
        size={sizeButton}
        onClick={() => setModalShow(true)}
      >
        {buttonText}
      </Button>

      <ModalConfirmationVerticallyCenter
        {...otherProps}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
