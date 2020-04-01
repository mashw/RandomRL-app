import React, { useContext } from 'react';
import StateContext from '../context/state-context';

const Mutators = () => {
	const state = useContext(StateContext);
	return (
		<div className="mutators">
			<p id="mutators-title">Mutators: </p>
			<ul>
				<li>
					<p>Series Length: </p>
					<p>
						{state.match.series} {state.match.series < 2 ? 'match' : 'matches'}
					</p>
				</li>
				<li>
					<p>Match Length: </p>
					<p>{state.match.length} minutes</p>
				</li>
				<li>
					<p>Max Score: </p>
					<p>{state.match.maxScore} goals.</p>
				</li>
				<li>
					<p>Overtime: </p>
					<p>{state.match.overtime}</p>
				</li>
				<li>
					<p>Ball Max Speed: </p>
					<p>{state.match.ballSpeed}</p>
				</li>
				<li>
					<p>Ball Type: </p>
					<p>{state.match.ballType}</p>
				</li>
				<li>
					<p>Ball Physics: </p>
					<p>{state.match.ballPhysics}</p>
				</li>
				<li>
					<p>Ball Size: </p>
					<p>{state.match.ballSize}</p>
				</li>
				<li>
					<p>Ball Bounciness: </p>
					<p>{state.match.ballBounciness}</p>
				</li>
				<li>
					<p>Boost Amount: </p>
					<p>{state.match.boostAmount}</p>
				</li>
				<li>
					<p>Boost Strength: </p>
					<p>{state.match.boostStrength}</p>
				</li>
				<li>
					<p>Gravity: </p>
					<p>{state.match.gravity}</p>
				</li>
				<li>
					<p>Demolition: </p>
					<p>{state.match.demolition}</p>
				</li>
				<li>
					<p>Respawn Time: </p>
					<p>{state.match.respawnTime}</p>
				</li>
			</ul>
		</div>
	);
};

export { Mutators as default };
