import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  type,
}) => {
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center' as 'center',
      backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
      color: type === 'success' ? '#155724' : '#721c24',
      border: `1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Payment Modal"
      ariaHideApp={false}
    >
      <h2>{message}</h2>
      <button onClick={onClose}>OK</button>
    </Modal>
  );
};

export default CustomModal;
