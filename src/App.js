import React, { useReducer, useState, useEffect } from 'react';
import BackPanel from './components/back-panel';
import { defaultMatch, defaultSettings, defaultValues } from './util/defaults.js';
import { dbase } from './firebase.js';

import FrontPanel from './components/front-panel';
import { bgShuffler, getClosest, getMapPreview, heightSetter } from './util/helper-functions';
import { matchReducer } from './reducers/match-reducer';
import { valuesReducer } from './reducers/values-reducer';
import { settingsReducer } from './reducers/settings-reducer';
import SettingsModal from './components/modal.js';
import StateContext from './context/state-context';

function App() {
	const settingsData = JSON.parse(localStorage.getItem('settingsData'));
	const valuesData = JSON.parse(localStorage.getItem('valuesData'));
	const [ spinCount, setSpinCount ] = useState(0);

	const [ modalState, toggleModal ] = useState(false);
	const [ match, matchDispatch ] = useReducer(matchReducer, defaultMatch);
	const [ settings, settingsDispatch ] = useReducer(settingsReducer, settingsData || defaultSettings);
	const [ values, valuesDispatch ] = useReducer(valuesReducer, valuesData || defaultValues);

	const generateMatch = () => {
		new Promise((resolve, reject) => {
			resolve(matchDispatch({ type: 'GENERATE_MATCH', values }));
		})
			.then(() => {
				matchDispatch({ type: 'GENERATE_MAP' });
	  })
	  .then(() => {		  
        dbase.ref()          
          .once('value')
          .then((snapshot) => {
			const val = snapshot.val();
			const currentNumber = val.spinNumber;  
			dbase.ref().set({
				spinNumber: currentNumber + 1
			  })
			  setSpinCount(currentNumber);
			console.log('#: ' + currentNumber);
          })
          .catch((e) => {
            console.log('Error fetching data', e);
        }
		);
	  })
	  .then(() => {
				const playerCount = settings.teamSize * 2;
				const playerArray = Object.values(settings.players).slice(0, playerCount);
        		const shuffle = settings.shufflePlayers;
				matchDispatch({ type: 'GENERATE_TEAMS', playerCount, playerArray, shuffle });
			})
			.then(() => {
				matchDispatch({ type: 'GENERATE_MUTATORS' });
	  })
	  .then(() => {
		  const settingsButton = document.getElementsByClassName('settings-button');
		  settingsButton[0].style.zIndex = "0";
	  })
      .then(() => {
        const card = document.querySelector('.card');
        card.classList.toggle('is-flipped');
      })
			.then(() => {
				const min = values.minPoints;
				const max = values.maxPoints;
				const rNumber = 10000 + Math.floor(Math.random() * (max - min) + min);
				valuesDispatch({ type: 'GENERATE_POINTS', rNumber });
      })
      
	};

	const setTeamSize = (e) => {
		const teamSize = e.target.value;
		settingsDispatch({ type: 'SET_TEAM_SIZE', teamSize });
	};

	const setShufflePlayers = (e) => {
		const shuffleValue = e.target.checked;
		settingsDispatch({ type: 'SET_SHUFFLE_PLAYERS', shuffleValue });
	};

	const setPlayerNames = (e) => {
		const playerId = e.target.name;
		const playerName = e.target.value;
		settingsDispatch({ type: 'SET_PLAYER_NAMES', playerId, playerName });
	};

	const setValue = (e) => {
		const name = e.target.name;
		//Rounds values up or down to closest 10 on sliders for "click" points
		const value = getClosest(e.target.value);
		valuesDispatch({ type: 'SET_VALUE', name, value });
	};

	const resetValues = () => {
		console.log(localStorage);
		settingsDispatch({ type: 'RESET_SETTINGS', defaultSettings });
		valuesDispatch({ type: 'RESET_VALUES', defaultValues });
	};

	const handleOdometerSetting = (e) => {
		const value = e.target.checked ? true : false;
		valuesDispatch({ type: 'HANDLE_ODOMETER', value });
	};

	const setMinPoints = (e) => {
		const value = e.target.value;
		valuesDispatch({ type: 'SET_MIN_POINTS', value });
	};

	const setMaxPoints = (e) => {
		const value = e.target.value;
		valuesDispatch({ type: 'SET_MAX_POINTS', value });
  };
  
  const returnToFront = () => {
    const card = document.querySelector('.card');
    card.classList.toggle('is-flipped');
    setTimeout(function(){
      const settingsButton = document.getElementsByClassName('settings-button');
      settingsButton[0].style.zIndex = "3";
      const front = document.getElementsByClassName('front-panel');
      front[0].style.visibility = "visible";
    }, 750);
  };

	//These effects run only on page load because second parameter is an empty array
	useEffect(() => {
	bgShuffler();
	heightSetter();
	window.addEventListener("resize", () => document.getElementsByClassName("wrapper")[0].style.height = window.innerHeight + "px");
    //BELOW CODE CYCLES BACKGROUND IMAGES BUT NEEDS ALTERING TO PREVENT ONLOAD FLASH, POSSIBLY LOAD NEXT IMAGE INTO A DIV BELOW AND THEN FADE INTO THAT
    // const interval = setInterval(() => {
    //   bgShuffler();
    // }, 10000);
    // return () => clearInterval(interval);
	}, []);

  //Save settings to local storage if settings or values change
	useEffect(() => {
		localStorage.setItem('settingsData', JSON.stringify(settings));
    localStorage.setItem('valuesData', JSON.stringify(values));
  }, [settings, values]);

  //Set the map preview image when map is set in state
  useEffect(() => {
    if(match.map !== undefined) {
      getMapPreview(match.map);
    }
  }, [match.map]);

	return (
    <>
		<div className="wrapper">
			<div className="bg" />
			<StateContext.Provider value={{ match, settings, values }}>
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
			</StateContext.Provider>
		</div>
    {/* <div className="ad-bottom">
    </div> */}
    </>
	);
}

export default App;
