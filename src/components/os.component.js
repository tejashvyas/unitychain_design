import React from 'react';
import { Rnd } from 'react-rnd';
import Iframe from 'react-iframe';

class osComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { minimize, openFull, openSmall, onClick } = this.props;

		return (
			<div className="body_content">
				<ul className="bottom_hdr">
					{minimize.map((result, index) => (
						<li key={index}>
							{result.open && (
								<button onClick={e => onClick('TO_OPEN', result)}>
									<img src={require(`../assests/images/dark/${result.icon}`)} width="20" />
									{result.name}
								</button>
							)}
						</li>
					))}
				</ul>

				
				{openSmall.map((result, index) => (
					<Rnd
						ref={`osRow${index}`}
						key={index}
						default={{
							x: 20,
							y: 20,
							width: 768,
							height: 500,
						}}
						onClick={e => onClick('ADD_TO_ZINDEX', result)}
						className={`${result.fullscreen ? 'fullscreen' : ''}  ${result.zindex ? 'zindex' : ''} ${
							result.none ? 'd-none' : ''
						}`}
					>
						<div className="header_content">
							<div className="float-left title">{result.name}</div>
							<div className="float-right">
								<button
									onClick={e => {
										e.stopPropagation();
										onClick(result.fullscreen ? 'FULL_TO_SMALL' : 'SMALL_TO_FULL', result);
									}}
								>
									{!result.fullscreen && (
										<img src={require('../assests/images/fullscreen.svg')} width="14" />
									)}
									{result.fullscreen && (
										<img src={require('../assests/images/normalscreen.svg')} width="14" />
									)}
								</button>
								<button
									onClick={e => {
										e.stopPropagation();
										onClick('TO_MINIMIZE', result);
									}}
								>
									-
								</button>
								<button
									onClick={e => {
										e.stopPropagation();
										onClick('TO_REMOVE', result);
									}}
								>
									&times;
								</button>
							</div>
						</div>

						<Iframe url={result.url} className="iframe" display="initial" position="relative" />
					</Rnd>
				))}
				
			</div>
		);
	}
}

export default osComponent;
