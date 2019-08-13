// Actions
const NEXT_SLIDESET   = 'NEXT_SLIDESET';   // Aka right arrow
const PREV_SLIDESET   = 'PREV_SLIDESET';   // Aka left arrow
const NEXT_SLIDE      = 'NEXT_SLIDE';      // Aka down arrow
const PREV_SLIDE      = 'PREV_SLIDE';      // Aka up arrow
const FULLSCREEN      = 'FULLSCREEN';      //
const EXIT_FULLSCREEN = 'EXIT_FULLSCREEN'; // Aka esc key
const JUMP_TO_START   = 'JUMP_TO_START';   // Aka 0 key

// Default state
const defaultState = {
	fullscreen: false,
	slideset: 0,
	slide: 0,
}

// Reducer
const clampDown = (value, minValue) =>
	value < minValue ? minValue : value;

export default (state = defaultState, action = {}) =>
	action.type === NEXT_SLIDESET   ? { ...state, slideset: state.slideset + 1, slide: 0 } :
	action.type === PREV_SLIDESET   ? { ...state, slideset: clampDown(state.slideset - 1, 0), slide: 0 } :
	action.type === NEXT_SLIDE      ? { ...state, slide: state.slide + 1 } :
	action.type === PREV_SLIDE      ? { ...state, slide: clampDown(state.slide - 1, 0) } :
	action.type === FULLSCREEN      ? { ...state, fullscreen: true } :
	action.type === EXIT_FULLSCREEN ? { ...state, fullscreen: false } :
	action.type === JUMP_TO_START   ? { ...state, slideset: 0, slide: 0 } :
	state;

// Action creators
export const nextSlideset   = () => ({ type: NEXT_SLIDESET   });
export const prevSlideset   = () => ({ type: PREV_SLIDESET   });
export const nextSlide      = () => ({ type: NEXT_SLIDE      });
export const prevSlide      = () => ({ type: PREV_SLIDE      });
export const jumpToStart    = () => ({ type: JUMP_TO_START });

export const fullscreen     = () => {
	const el = document.documentElement,
			rfs = el.requestFullscreen
				|| el.webkitRequestFullScreen
				|| el.mozRequestFullScreen
				|| el.msRequestFullscreen;

	rfs.call(el);

	return { type: FULLSCREEN };
}

export const exitFullscreen = () => ({ type: EXIT_FULLSCREEN });
