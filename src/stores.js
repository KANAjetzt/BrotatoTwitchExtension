import {writable} from "svelte/store"

// https://stackoverflow.com/a/65171909
export function statefulSwap(initialState) {
	const state = writable(initialState);
	let nextState = initialState;

	function transitionTo(newState) {
		if(nextState === newState) return;
		nextState = newState
		state.set(null)
	}

	function onOutro() {
		state.set(nextState)
	}
	return {
		state,
		transitionTo,
		onOutro
	}
}