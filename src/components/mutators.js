import React, { useContext } from 'react';
import MatchContext from '../context/match-context';

const Mutators = () => {
    const matchState = useContext(MatchContext);
    return (
        <div>
        Mutators:
            <ul>
            <li>
                <h5>Series Length:</h5>
                <p className="mutator-setting">{matchState.mutators.series} {matchState.mutators.series < 2 ? 'match' : 'matches'}</p>
            </li>
            <li>
                <h5>Match Length:</h5>
                <p className="mutator-setting">{matchState.mutators.matchLength} minutes</p>
            </li>            
            <li>
                <h5>Max Score:</h5>
                <p className="mutator-setting">{matchState.mutators.maxScore} goals.</p>
            </li>
            <li>
                <h5>Overtime:</h5>
                <p className="mutator-setting">{matchState.mutators.overtime} minutes</p>
            </li>
            <li>
                <h5>Ball Max Speed:</h5>
                <p className="mutator-setting">{matchState.mutators.ballSpeed}</p>
            </li>
            <li>
                <h5>Ball Type:</h5>
                <p className="mutator-setting">{matchState.mutators.ballType}</p>
            </li>
            <li>
                <h5>Ball Physics:</h5>
                <p className="mutator-setting">{matchState.mutators.ballPhysics}</p>
            </li>
            <li>
                <h5>Ball Size:</h5>
                <p className="mutator-setting">{matchState.mutators.ballSize}</p>
            </li>
            <li>
                <h5>Ball Bounciness:</h5>
                <p className="mutator-setting">{matchState.mutators.ballBounciness}</p>
            </li>
            <li>
                <h5>Boost Amount:</h5>
                <p className="mutator-setting">{matchState.mutators.boostAmount}</p>
            </li>
            <li>
                <h5>Boost Strength:</h5>
                <p className="mutator-setting">{matchState.mutators.boostStrength}</p>
            </li>
            <li>
                <h5>Gravity:</h5>
                <p className="mutator-setting">{matchState.mutators.gravity}</p>
            </li>
            <li>
                <h5>Demolition:</h5>
                <p className="mutator-setting">{matchState.mutators.demolition}</p>
            </li>
            <li>
                <h5>Respawn Time:</h5>
                <p className="mutator-setting">{matchState.mutators.respawnTime}</p>
            </li>
        </ul>
        </div>
    )
}

export {Mutators as default};