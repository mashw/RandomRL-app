import React from 'react';

const FrontPanel = (props) => {
	return (
		<div className="front-panel">
			<div className="logo-wrapper">
				<img src={require('../images/logo.png')} alt="Random Rocket League Logo" />
			</div>
			<div>
				<div className="generator-button__box no-select" onClick={() => props.generateMatch()}>
						<img src={require('../images/gen-button.svg')} alt="Generate Match Button" />
				</div>
        {/* <div className="settings-button">
          <img src={require('../images/cog.svg')} onClick={() => props.toggleModal(true)} alt="Settings Button" />
        </div>				 */}
			</div>
		</div>
	);
};

export { FrontPanel as default };
