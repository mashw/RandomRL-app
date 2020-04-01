import React, { useContext } from 'react';
import Modal from 'react-modal';
import StateContext from '../context/state-context';
import { sliderTooltips } from '../util/helper-functions';

const SettingsModal = (props) => {
	const state = useContext(StateContext);
	const teamSize = state.settings.teamSize;
	return (
		<Modal
			className="settings-modal"
			isOpen={!!props.modalState} //'!!' Converts to true boolean values
			contentLabel="Settings"
			onRequestClose={() => props.toggleModal(false)}
			shouldCloseOnEsc={true}
		>
			<div className="modal-wrapper">
        <div className="h2wrapper">
          <h2>Options</h2>
        </div>
				{/* Team Size Dropdown */}
				<div className="team-size_inputs">
					<select
						className="team-size_dropdown"
						value={state.settings.teamSize}
						name="teams"
						onChange={(e) => props.setTeamSize(e)}
					>
						<option value={1}>1v1</option>
						<option value={2}>2v2</option>
						<option value={3}>3v3</option>
						<option value={4}>4v4</option>
					</select>
					<label htmlFor="teams">Team Size</label>
				</div>

				{/* Player Name Inputs */}
				<div className="player-name_inputs">
					<input
						type="text"
						maxLength="15"
						name="player1"
						value={state.settings.players.player1}
						onChange={(e) => props.setPlayerNames(e)}
					/>
					<input
						type="text"
						maxLength="15"
						name="player2"
						value={state.settings.players.player2}
						onChange={(e) => props.setPlayerNames(e)}
					/>
					{teamSize > 1 ? (
						<input
							type="text"
							maxLength="15"
							name="player3"
							value={state.settings.players.player3}
							onChange={(e) => props.setPlayerNames(e)}
						/>
					) : (
						<input type="text" name="player3" value={''} disabled />
					)}
					{teamSize > 1 ? (
						<input
							type="text"
							maxLength="15"
							name="player4"
							value={state.settings.players.player4}
							onChange={(e) => props.setPlayerNames(e)}
						/>
					) : (
						<input type="text" name="player4" value={''} disabled />
					)}
					{teamSize > 2 ? (
						<input
							type="text"
							maxLength="15"
							name="player5"
							value={state.settings.players.player5}
							onChange={(e) => props.setPlayerNames(e)}
						/>
					) : (
						<input type="text" name="player5" value={''} disabled />
					)}
					{teamSize > 2 ? (
						<input
							type="text"
							maxLength="15"
							name="player6"
							value={state.settings.players.player6}
							onChange={(e) => props.setPlayerNames(e)}
						/>
					) : (
						<input type="text" name="player6" value={''} disabled />
					)}
					{teamSize > 3 ? (
						<input
							type="text"
							maxLength="15"
							name="player7"
							value={state.settings.players.player7}
							onChange={(e) => props.setPlayerNames(e)}
						/>
					) : (
						<input type="text" name="player7" value={''} disabled />
					)}
					{teamSize > 3 ? (
						<input
							type="text"
							maxLength="15"
							name="player8"
							value={state.settings.players.player8}
							onChange={(e) => props.setPlayerNames(e)}
						/>
					) : (
						<input type="text" name="player8" value={''} disabled />
					)}
				</div>

				{/* Randomness Range Inputs */}

				<div className="randomness-sliders">
					<p htmlFor="modeValue">Mode Randomness - {sliderTooltips(state.values.modeValue)}</p>

					{/* Value * 100 for range slider to update value correctly as / 100 in match reducer */}
					<input
						type="range"
						min="0"
						max="100"
						value={state.values.modeValue * 100}
						name="modeValue"
						onChange={(e) => props.setValue(e)}
					/>
				</div>

				<div className="randomness-sliders">
					<p htmlFor="rumbleValue">Rumble Randomness - {sliderTooltips(state.values.rumbleValue)}</p>
					<input
						type="range"
						min="0"
						max="100"
						value={state.values.rumbleValue * 100}
						name="rumbleValue"
						onChange={(e) => props.setValue(e)}
					/>

					<div className="randomness-sliders">
						<p htmlFor="mutatorValue">Mutators Randomness - {sliderTooltips(state.values.mutatorValue)}</p>

						<input
							type="range"
							min="0"
							max="100"
							value={state.values.mutatorValue * 100}
							name="mutatorValue"
							onChange={(e) => props.setValue(e)}
						/>
						<p className="random-value" />
					</div>
				</div>

				{/* Switch Inputs */}
				<div className="switches">
				{/* Shuffle Players Checkbox */}
				<div>	
					<label className="switch" name="shuffle-switch">
						<input
							type="checkbox"
							onChange={(e) => props.setShufflePlayers(e)}
							checked={state.values.shufflePlayers}
						/>
						<span className="slider" />
					</label>
					<label className="switch-label" htmlFor="shuffle-switch">
						Shuffle Players
					</label>
				</div>

				<div>
					<label className="switch" name="odometer-switch">
						<input
							type="checkbox"
							onChange={(e) => props.handleOdometerSetting(e)}
							checked={state.values.odometerSetting}
						/>
						<span className="slider" />
					</label>
					<label className="switch-label" htmlFor="odometer-switch">
						Points Reel
					</label>
				</div>				
	</div>


				{/* Odometer Min Max Inputs */}
				
				<div className="odometer-min-max-inputs">
				<p>Min Max Points</p>
					{state.values.odometerSetting === true ? (
						<input
							type="number"
							value={state.values.minPoints}
							max={state.values.maxPoints - 1}
							onChange={(e) => props.setMinPoints(e)}
						/>
					) : (
						<input type="number" value={state.values.minPoints} disabled />
					)}

					{state.values.odometerSetting === true ? (
						<input
							type="number"
							value={state.values.maxPoints}
							min={state.values.minPoints + 1}
							onChange={(e) => props.setMaxPoints(e)}
						/>
					) : (
						<input type="number" value={state.values.maxPoints} disabled />
					)}
				</div>
			</div>

			<div className="settings-buttons">
				<button onClick={() => props.resetValues()}>Reset to Default Values</button>
				<button onClick={() => props.toggleModal(false)}>Close</button>
			</div>
		</Modal>
	);
};

export default SettingsModal;
