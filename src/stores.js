import { writable } from 'svelte/store';

export const game_data = writable({
	stats_primary: [],
	stats_secondary: [],
	items: [],
	weapons: []
});

export const game_translations = writable({});
