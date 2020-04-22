import React, { useContext } from 'react';
import StateContext from '../context/state-context';
import Odometer from 'react-odometerjs';

const Accumulator = (props) => {
	const state = useContext(StateContext);
	return (
		<div className="accumulator">
			<div className="acc-wrapper">
				<h1>Spin Accumulator. Wow.</h1>
				<div className="row">
					<div className="column">
						<div>
							<h2>How many spins?</h2>
							<input className="spin-amount" 
                onChange={(e) => props.setSpinAmount(e)}
              />
							<button className="accButton" onClick={() => props.startAcc()} >Go</button>
						</div>
					</div>

					<div className="column">
						<div>
							<h2>Spins {state.values.spinNumber} / {state.values.amountSpins} </h2>
							<div className="odo">
								<Odometer
									className="odometer current-odometer"
									//Adding 10000 to value in order to force 4 digit odometer, hiding leading digit with CSS
									value={state.values.currentOdoValue + 10000}
									format="(dddd)"
									duration="200"
                  
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="column">
						<div className="total-box">
							<Odometer
								className="odometer total-odometer"
								//Adding 10000 to value in order to force 4 digit odometer, hiding leading digit with CSS
								value={state.values.totalOdoValue + 10000}
								format="(dddd)"
								duration="200"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { Accumulator as default };
