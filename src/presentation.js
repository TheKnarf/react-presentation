import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './presentation.css';

import {
	nextSlideset,
	prevSlideset,
	nextSlide,
	prevSlide,
	fullscreen,
	exitFullscreen,
	jumpToStart,
} from '../ducks';

const keyCodes = {
	ArrowDown: 40,
	ArrowRight: 39,
	ArrowUp: 38,
	ArrowLeft: 37,
	Escape: 27,
	KeyF: 70,
	Digit0: 48,
}

const keyMapping = [
	{	action: nextSlideset,   key: keyCodes.ArrowRight  },
	{  action: prevSlideset,   key: keyCodes.ArrowLeft   },
	{  action: nextSlide,      key: keyCodes.ArrowDown   },
	{  action: prevSlide,      key: keyCodes.ArrowUp     },
	{  action: fullscreen,     key: keyCodes.KeyF,      ctrlKey: true },
	{  action: exitFullscreen, key: keyCodes.Escape      },
	{  action: jumpToStart,    key: keyCodes.Digit0      },
];

const Presentation = ({ children, dispatch }) => {
	useEffect(() => {
		function listener(event) {
			const ret = keyMapping
				.find( ({ key, ctrlKey = false }) =>
					key === event.keyCode && ctrlKey === event.ctrlKey
				);

			if(typeof ret !== 'undefined' && typeof ret.action !== 'undefined') {
				dispatch(ret.action());
			}
		}

		document.addEventListener('keyup', listener);
		
		return () => {
			document.removeEventListener('keyup', listener);
		};
	});

	return <div className="presentation">
		{ children }
	</div>;
}

export default connect(
	/* mapStateToProps */ state => state
)(Presentation);
