import { createStore } from 'redux'
import reducers from './ducks'

export default (preloadedState) => {

	const store = createStore(
		reducers,
		preloadedState,
	);

	if(module.hot) {
		module.hot.accept('./ducks', () => {
			const newRootReducer = require('./ducks').default;
			store.replaceReducer(newRootReducer);
		});
	}

	return store;
}
