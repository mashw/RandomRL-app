import React from 'react';

const FrontPanel = (props) => {  
  return (
      <div>
        <button onClick={() => props.generateMatch()}>Click</button>
        <button onClick={() => props.toggleModal(true)}>Settings</button>
      </div>
  )
}

export {FrontPanel as default};