import React from 'react';
import Modal from 'react-modal';

const SettingsModal = (props) => {
  return (
    <Modal
      isOpen={!!props.modalState} //'!!' Converts to true boolean values
      contentLabel="Settings"
      onRequestClose={() => props.toggleModal(false)}
      shouldCloseOnEsc={true}
    >
      <h3>Settings</h3>
      <button onClick={() => props.toggleModal(false)}>Close</button>
    </Modal>
  )
};

export default SettingsModal;
