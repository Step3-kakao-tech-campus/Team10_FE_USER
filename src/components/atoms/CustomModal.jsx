import React from "react";
import Modal from "react-modal";

const CustomModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  title,
  content,
  confirmText,
  cancelText,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="px-8 py-4 mx-4 my-40 bg-white border-2 border-primary rounded-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30"
      contentLabel="Custom Modal"
    >
      <div className="text-lg font-semibold text-primary">{title}</div>
      <div className="my-6">{content}</div>
      <div className="flex justify-end">
        <button
          onClick={onConfirm}
          className="px-4 py-2 mr-2 text-white rounded-md bg-primary"
        >
          {confirmText}
        </button>
        <button
          onClick={onRequestClose}
          className={`px-4 py-2 bg-gray-300 rounded-md ${
            !cancelText && "hidden"
          } `}
        >
          {cancelText}
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
