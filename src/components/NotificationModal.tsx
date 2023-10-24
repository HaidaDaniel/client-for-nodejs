import React, { FC, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface NotificationModalProps {
  show: boolean;
  message: string;
  type: 'error' | 'success';
  onClose:( () => void)|undefined;
}

const NotificationModal: FC<NotificationModalProps> = ({ show, message, type, onClose }) => {
  const modalTitle = type === 'success' ? 'Success' : 'Error';

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;