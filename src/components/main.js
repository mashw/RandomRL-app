import React, { useContext } from 'react';
import StateContext from '../context/state-context';
import Odometer from 'react-odometerjs';

export const Main = () => {
    <>
    <div className="settings-button">
          <img src={require('../src/images/cog.svg')} onClick={() => toggleModal(true)} alt="Settings Button" />
        </div>
				<div className="scene">
					<div className="card">
						<div className="card__face card__face--front">
							<FrontPanel
								generateMatch={generateMatch}
								modalState={modalState}
								toggleModal={toggleModal}
							/>
						</div>
						<div className="card__face card__face--back">
							<BackPanel 
                returnToFront={returnToFront}
					spinCount={spinCount}
              />
						</div>
					</div>
				</div>


        

				<SettingsModal
					modalState={modalState}
					toggleModal={toggleModal}
					handleOdometerSetting={handleOdometerSetting}
					resetValues={resetValues}
					setMinPoints={setMinPoints}
					setMaxPoints={setMaxPoints}
					setPlayerNames={setPlayerNames}
					setShufflePlayers={setShufflePlayers}
					setTeamSize={setTeamSize}
					setValue={setValue}
				/>
    </>
}

export { Main as default };
