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
      className="mx-4 overflow-auto bg-white shadow-xl my-72 border-primary rounded-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30"
      contentLabel="Custom Modal">
      <div className="p-4 grid-4">
        <div className="text-xl font-semibold text-center text-primary">
          {title}
        </div>
        <div>{content}</div>
      </div>
      <div className="flex">
        <button onClick={onConfirm} className="w-1/2 p-4 text-white bg-primary">
          {confirmText}
        </button>
        <button
          onClick={onRequestClose}
          className={`p-4 w-1/2 bg-gray-300 ${!cancelText && "hidden"} `}>
          {cancelText}
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
