import { asyncable } from 'svelte-asyncable';
import { writable } from 'svelte/store';

export const app_store = writable({
	show_tooltip: false,
	tooltip_data: {
		tier: '',
		img_src: '',
		name: '',
		set: '',
		effect_text: '',
		stat_text: '',
		position: {}
	}
});

export const game_data = writable({
	stats_primary: {},
	stats_secondary: {},
	items: [],
	weapons: []
});

export const game_translations = asyncable(async () => {
	// Get Data
	const result = await fetch('/translations.json');
	const data = result.json();

	return data;
});
