import React, { useEffect, useReducer, useContext, cloneElement } from 'react';
import * as ducks from './presentation.ducks';
export { ducks };

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

const PresentationContext = React.createContext();

export const Presentation = ({ children, keyMappings = defaultKeyMapping }) => {
	const [state, dispatch] = useReducer(ducks.default, ducks.defaultState);

	useEffect(() => {
		function listener(event) {
			const ret = keyMappings
				.find( ({ key, ctrlKey = false }) =>
					key === event.keyCode && ctrlKey === event.ctrlKey
				);

			if(typeof ret !== 'undefined' && typeof ret.action !== 'undefined') {
				//console.log(ret.action(), state);
				dispatch(ret.action());
				event.preventDefault();
			}
		}

		document.addEventListener('keydown', listener);
		
		return () => {
			document.removeEventListener('keydown', listener);
		};
	});

	return <PresentationContext.Provider value={{ state }}>
		<div className="presentation">
			{ children }
		</div>
	</PresentationContext.Provider>
};

export const Slideset = ({ children, i }) => {
	const { state } = useContext(PresentationContext);
	if(typeof state === 'undefined')
		return null;

	const { slideset } = state;

	return <div className="slideset" style={{ display: i === slideset ? 'block' : 'none' }}>
	{
      React.Children
           .toArray(children)
           .map((child, i) => cloneElement(child, { key: i, i }))
	}
	</div>;
};

export const Slide = ({ children, i }) => {
	const { state } = useContext(PresentationContext);
	if(typeof state === 'undefined')
		return null;

	const { slide } = state;

	return <div className="slide" style={{ display: i === slide ? 'block' : 'none' }}>
	{ children }
	</div>;
}
