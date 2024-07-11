import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps>= ({isOpen, onConfirm, onCancel, title, message}) => {
if(!isOpen) return null;

return(
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end">
        <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
          Cancelar
        </button>
        <button onClick={onConfirm} className="bg-green-500 text-white px-4 py-2 rounded">
          Confirmar
        </button>
      </div>
    </div>
  </div>
);
};

export default ConfirmModal;