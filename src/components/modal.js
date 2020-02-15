import React, {useContext} from 'react';
import Modal from 'react-modal';
import StateContext from '../context/state-context';
import { sliderTooltips } from '../util/helper-functions';

const SettingsModal = (props) => {
  const teamSize = props.settings.teamSize;
  const state = useContext(StateContext);
  return (
    <Modal
      isOpen={!!props.modalState} //'!!' Converts to true boolean values
      contentLabel="Settings"
      onRequestClose={() => props.toggleModal(false)}
      shouldCloseOnEsc={true}
    >
      <h3>Settings</h3>

      {/* Team Size Dropdown */}
      <select value={state.settings.teamSize} name="teams" onChange={(e) => props.setTeamSize(e)}>
        <option value={1}>1v1</option>
        <option value={2}>2v2</option>
        <option value={3}>3v3</option>
        <option value={4}>4v4</option>
      </select>

      {/* Shuffle Players Checkbox */}
      <input type="checkbox" name="shufflePlayers" onChange={(e) => props.setShufflePlayers(e)} checked={state.settings.shufflePlayers}/>Shuffle players?


      {/* Player Name Inputs */}
      <div>
        <input type="text" maxLength="15" name="player1" value={state.settings.players.player1} onChange={ (e) => props.setPlayerNames(e) }/>
        <input type="text" maxLength="15" name="player2" value={state.settings.players.player2} onChange={ (e) => props.setPlayerNames(e) } />
        {teamSize > 1 ? <input type="text" maxLength="15" name="player3" value={state.settings.players.player3} onChange={ (e) => props.setPlayerNames(e) }/> : <input type="text" name="player3" disabled />}
        {teamSize > 1 ? <input type="text" maxLength="15" name="player4" value={state.settings.players.player4} onChange={ (e) => props.setPlayerNames(e) }/> : <input type="text" name="player4" disabled/>}
        {teamSize > 2 ? <input type="text" maxLength="15" name="player5" value={state.settings.players.player5} onChange={ (e) => props.setPlayerNames(e) }/> : <input type="text" name="player5" disabled/>}
        {teamSize > 2 ? <input type="text" maxLength="15" name="player6" value={state.settings.players.player6} onChange={ (e) => props.setPlayerNames(e) }/> : <input type="text" name="player6" disabled/>}
        {teamSize > 3 ? <input type="text" maxLength="15" name="player7" value={state.settings.players.player7} onChange={ (e) => props.setPlayerNames(e) }/> : <input type="text" name="player7" disabled/>}
        {teamSize > 3 ? <input type="text" maxLength="15" name="player8" value={state.settings.players.player8} onChange={ (e) => props.setPlayerNames(e) }/> : <input type="text" name="player8" disabled/>}
      </div>

      {/* Randomness Range Inputs */}
      <div>
        <div>
          <p>{sliderTooltips(state.values.modeValue)}</p>
          {/* Value * 100 for range slider to update value correctly as / 100 in match reducer */}
          <input type="range" min="0" max="100" value={state.values.modeValue * 100} name="modeValue" onChange={ (e) => props.setValue(e) }/>
          <label for="modeValue">Mode Randomness</label>
        </div>
        <div>
          <p>{sliderTooltips(state.values.rumbleValue)}</p>
          <input type="range" min="0" max="100" value={state.values.rumbleValue * 100} name="rumbleValue" onChange={ (e) => props.setValue(e) }/>
          <label for="rumbleValue">Rumble Randomness</label>
        </div>
        <div>
          <p>{sliderTooltips(state.values.mutatorValue)}</p>
          <input type="range" min="0" max="100" value={state.values.mutatorValue * 100} name="mutatorValue" onChange={ (e) => props.setValue(e) }/>
          <label for="mutatorValue">Mutators Randomness</label>
        </div>
      </div>
      
      
      <button onClick={() => props.toggleModal(false)}>Close</button>
    </Modal>
  )
};

export default SettingsModal;
