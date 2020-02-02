import React, { useContext } from 'react';
import StateContext from '../context/state-context';

const Mutators = () => {
    const state = useContext(StateContext);
    return (
        <div>
        Mutators:
            <ul>
            <li>
                <h5>Series Length:</h5>
                <p className="mutator-setting">{state.match.series} {state.match.series < 2 ? 'match' : 'matches'}</p>
            </li>
            <li>
                <h5>Match Length:</h5>
                <p className="mutator-setting">{state.match.length} minutes</p>
            </li>            
            <li>
                <h5>Max Score:</h5>
                <p className="mutator-setting">{state.match.maxScore} goals.</p>
            </li>
            <li>
                <h5>Overtime:</h5>
                <p className="mutator-setting">{state.match.overtime} minutes</p>
            </li>
            <li>
                <h5>Ball Max Speed:</h5>
                <p className="mutator-setting">{state.match.ballSpeed}</p>
            </li>
            <li>
                <h5>Ball Type:</h5>
                <p className="mutator-setting">{state.match.ballType}</p>
            </li>
            <li>
                <h5>Ball Physics:</h5>
                <p className="mutator-setting">{state.match.ballPhysics}</p>
            </li>
            <li>
                <h5>Ball Size:</h5>
                <p className="mutator-setting">{state.match.ballSize}</p>
            </li>
            <li>
                <h5>Ball Bounciness:</h5>
                <p className="mutator-setting">{state.match.ballBounciness}</p>
            </li>
            <li>
                <h5>Boost Amount:</h5>
                <p className="mutator-setting">{state.match.boostAmount}</p>
            </li>
            <li>
                <h5>Boost Strength:</h5>
                <p className="mutator-setting">{state.match.boostStrength}</p>
            </li>
            <li>
                <h5>Gravity:</h5>
                <p className="mutator-setting">{state.match.gravity}</p>
            </li>
            <li>
                <h5>Demolition:</h5>
                <p className="mutator-setting">{state.match.demolition}</p>
            </li>
            <li>
                <h5>Respawn Time:</h5>
                <p className="mutator-setting">{state.match.respawnTime}</p>
            </li>
        </ul>
        </div>
    )
}

export {Mutators as default};