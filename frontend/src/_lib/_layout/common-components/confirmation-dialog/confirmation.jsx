import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { hideDialog } from "./confirmation-slice";

const ConfirmationDialog = () => {
  const dispatch = useDispatch();
  const { show, title, message, onConfirm, onCancel } = useSelector(
    (state) => state.confirmationDialog
  );

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    dispatch(hideDialog());
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    dispatch(hideDialog());
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {message} {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to {message} this {title}?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationDialog;
