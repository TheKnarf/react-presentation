import React, { useEffect, useReducer, useContext, cloneElement } from 'react';
import * as ducks from './presentation.ducks';
export { ducks };
import * as R from 'ramda';

import {
	popSlide,
	pushSlide,
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
	{	action: nextSlide,      key: keyCodes.ArrowRight  },
	{  action: prevSlide,      key: keyCodes.ArrowLeft   },
	{  action: pushSlide,      key: keyCodes.ArrowDown   },
	{  action: popSlide,       key: keyCodes.ArrowUp     },
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
			{
				React.Children
				     .toArray(children)
				     .map((child, i) => cloneElement(child, { key: i, path: i }))
			}
		</div>
	</PresentationContext.Provider>
};

const Slide = ({ children, path }) => {
	const { state } = useContext(PresentationContext);
	if(typeof state === 'undefined')
		return null;

	const { slide } = state;

	return <div className="slide" style={{ display: slide == path ? 'block' : 'none' }}>
	{
      React.Children
           .toArray(children)
           .map((child, i) => cloneElement(child, { key: i, path }))
	}
	</div>;
}

export { Slide };
