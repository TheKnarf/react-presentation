import React, { useEffect, useReducer, cloneElement } from 'react';
import * as ducks from './presentation.ducks';
export { ducks };

//import './presentation.css';

import {
	nextSlideset,
	prevSlideset,
	nextSlide,
	prevSlide,
	fullscreen,
	exitFullscreen,
	jumpToStart,
} from './presentation.ducks';

const keyCodes = {
	ArrowDown: 40,
	ArrowRight: 39,
	ArrowUp: 38,
	ArrowLeft: 37,
	Escape: 27,
	KeyF: 70,
	Digit0: 48,
}

export const defaultKeyMapping = [
	{	action: nextSlideset,   key: keyCodes.ArrowRight  },
	{  action: prevSlideset,   key: keyCodes.ArrowLeft   },
	{  action: nextSlide,      key: keyCodes.ArrowDown   },
	{  action: prevSlide,      key: keyCodes.ArrowUp     },
	{  action: fullscreen,     key: keyCodes.KeyF,      ctrlKey: true },
	{  action: exitFullscreen, key: keyCodes.Escape      },
	{  action: jumpToStart,    key: keyCodes.Digit0      },
];

export const Presentation = ({ children, keyMappings = defaultKeyMapping }) => {
	const [state, dispatch] = useReducer(ducks.default);

	useEffect(() => {
		function listener(event) {
			const ret = keyMappings
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
};

export const Slideset = ({ children, i, slideset }) => {
	return <div className="slideset" style={{ display: i === slideset ? 'block' : 'none' }}>
	{
      React.Children
           .toArray(children)
           .map((child, i) => cloneElement(child, { key: i, i }))
	}
	</div>;
};

export const Slide = ({ children, i, slide }) =>
	<div className="slide" style={{ display: i === slide ? 'block' : 'none' }}>
	{ children }
	</div>;
