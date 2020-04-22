import React, { useReducer, useState, useEffect } from 'react';
import BackPanel from './components/back-panel';
import { defaultMatch, defaultSettings, defaultValues } from './util/defaults.js';
import { dbase } from './firebase.js';

import FrontPanel from './components/front-panel';
import Accumulator from './components/Accumulator';
import { bgShuffler, getClosest, getMapPreview, heightSetter } from './util/helper-functions';
import { matchReducer } from './reducers/match-reducer';
import { valuesReducer } from './reducers/values-reducer';
import { settingsReducer } from './reducers/settings-reducer';
import SettingsModal from './components/modal.js';
import StateContext from './context/state-context';

function App() {
	const settingsData = JSON.parse(localStorage.getItem('settingsData'));
	//const valuesData = JSON.parse(localStorage.getItem('valuesData'));
	const [ spinCount, setSpinCount ] = useState(0);

	const [ accState, setAcc ] = useState(false);
	const [ modalState, toggleModal ] = useState(false);
	const [ match, matchDispatch ] = useReducer(matchReducer, defaultMatch);
  //const [ settings, settingsDispatch ] = useReducer(settingsReducer, settingsData || defaultSettings);
  const [ settings, settingsDispatch ] = useReducer(settingsReducer, defaultSettings);
  const [ values, valuesDispatch ] = useReducer(valuesReducer, defaultValues);
  //const [ values, valuesDispatch ] = useReducer(valuesReducer, valuesData || defaultValues);

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
        		const shuffle = settings.playerShuffle;
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
      .then(() => {				
        setTimeout(function(){
          const front = document.getElementsByClassName('front-panel');
          front[0].style.visibility = "hidden";
        }, 400);  
			});
	};

	const setTeamSize = (e) => {
		const teamSize = e.target.value;
		settingsDispatch({ type: 'SET_TEAM_SIZE', teamSize });
	};

	const setShufflePlayers = (e) => {
		const shuffleValue = e.target.checked ? true : false;
    settingsDispatch({ type: 'SET_SHUFFLE_PLAYERS', shuffleValue });
    console.log(settings.playerShuffle)
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

  const setSpinAmount = (e) => {
    const amount = e.target.value;
    valuesDispatch( { type: 'SET_AMOUNT_OF_SPINS', amount });
  }

  const startAcc = () => {
    document.getElementsByClassName("accButton")[0].disabled = true;
    let spinNumber = 1;
    const value = 0;
      valuesDispatch( { type: 'RESET_TOTAL_SPIN', value });
      valuesDispatch( { type: 'RESET_CURRENT_SPIN', value });
    valuesDispatch( { type: 'SET_SPIN_NUMBER', spinNumber } );
    const loop = setInterval(function() {
      if (spinNumber <= values.amountSpins)    {
        valuesDispatch( { type: 'SET_SPIN_NUMBER', spinNumber } );
      const min = values.minPoints;
      const max = values.maxPoints;
			const currentSpin = 10000 + Math.floor(Math.random() * (max - min) + min);
      valuesDispatch({ type: 'SET_CURRENT_SPIN', currentSpin });
      valuesDispatch( { type: 'SET_TOTAL_SPIN', currentSpin } );
      } else {
        clearInterval(loop);
			  const rNumber = Math.floor(Math.random() * (8 - 1) + 1);
        const wow = new Audio(require(`./sounds/complete/${rNumber}.mp3`));
      wow.play();
      }
      spinNumber++;
    }, 3000);
  }

	//These effects run only on page load because second parameter is an empty array
	useEffect(() => {
	bgShuffler();
	heightSetter();
	document.addEventListener("keypress", (event) => {
		if (event.keyCode === 13) {
		//const main = document.getElementsByClassName("main-content");
		//main[0].innerHTML = '';
		setAcc(true);
	}
	})
	window.addEventListener("resize", () => document.getElementsByClassName("wrapper")[0].style.height = window.innerHeight + "px");
	}, []);

	useEffect(() => {
		console.log("trigger");
		if (accState === true) {
      const value = 0;
      valuesDispatch( { type: 'RESET_TOTAL_SPIN', value });
      valuesDispatch( { type: 'RESET_CURRENT_SPIN', value });
      const wow = new Audio(require('./sounds/1.mp3'));
      wow.play();
      document.getElementsByClassName("card")[0].style.marginTop = -2000 + "px";
      setTimeout(() => {
        document.getElementsByClassName("accumulator")[0].style.opacity = 1;
      },350);
      document.getElementsByClassName("accumulator")[0].style.zIndex = 5;
    }    
	}, [accState])

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

  //{accState === false ? <div className="bg wrapper">Test</div> : <div>Test2</div>}
  return (
<>
		<div className="wrapper">
			<div className="bg" />      
			<StateContext.Provider value={{ match, settings, values }}>
			<span className="main-content">			
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
          <Accumulator
            setSpinAmount={setSpinAmount}
            startAcc={startAcc}
          >

          </Accumulator>
          
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
			</span>
      
			</StateContext.Provider>
		</div>
    {/* <div className="ad-bottom">
    </div> */}
    </>
  )
}

export default App;
