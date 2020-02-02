import React, { useContext } from 'react';

import StateContext from '../context/state-context';

const FrontPanel = (props) => {
  const state = useContext(StateContext);  
  return (
      <div>
        <button onClick={() => props.generateMatch()}>Click</button>
        <button onClick={() => props.toggleModal(true)}>Settings</button>
      </div>
  )
}

export {FrontPanel as default};