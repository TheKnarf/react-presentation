// Actions
const NEXT_SLIDE      = 'NEXT_SLIDE';      // Aka right arrow
const PREV_SLIDE      = 'PREV_SLIDE';      // Aka left arrow
const FULLSCREEN      = 'FULLSCREEN';      //
const EXIT_FULLSCREEN = 'EXIT_FULLSCREEN'; // Aka esc key
const JUMP_TO_START   = 'JUMP_TO_START';   // Aka 0 key

// Default state
export const defaultState = {
	fullscreen: false,
	slide: 0,
}

// Reducer
const clampDown = (value, minValue) =>
	value < minValue ? minValue : value;

export default (state = defaultState, action = {}) =>
	action.type === NEXT_SLIDE      ? { ...state, slide: state.slide + 1 } :
	action.type === PREV_SLIDE      ? { ...state, slide: clampDown(state.slide - 1, 0) } :
	action.type === FULLSCREEN      ? { ...state, fullscreen: true } :
	action.type === EXIT_FULLSCREEN ? { ...state, fullscreen: false } :
	action.type === JUMP_TO_START   ? { ...state, slide: [0] } :
	state;

// Action creators
export const nextSlide      = () => ({ type: NEXT_SLIDE      });
export const prevSlide      = () => ({ type: PREV_SLIDE      });
export const jumpToStart    = () => ({ type: JUMP_TO_START   });

export const fullscreen     = () => {
	try {
		const el = document.documentElement,
				rfs = el.requestFullscreen
					|| el.webkitRequestFullScreen
					|| el.mozRequestFullScreen
					|| el.msRequestFullscreen;

		const val = rfs.call(el);
		if(typeof val.catch !== 'undefined') {
			val.catch(e => console.error(e));
		}
	} catch(e) {
		console.error(e);
	}

	return { type: FULLSCREEN };
}

export const exitFullscreen = () => ({ type: EXIT_FULLSCREEN });
