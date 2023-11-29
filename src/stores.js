import { asyncable } from 'svelte-asyncable';
import { writable, derived } from 'svelte/store';

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

export const game_data_counted_items = derived(game_data, ($game_data) => {
	const game_data_modulated = {...$game_data}

	if (game_data_modulated.items) {
		game_data_modulated.items = modulate_item_data(game_data_modulated.items);
	}

	return game_data_modulated
})

export const game_translations = asyncable(async () => {
	// Get Data
	const result = await fetch('translations.json');
	const data = result.json();

	return data;
});

function modulate_item_data(item_data) {
	// Count all multiples of items
	const new_item_data = item_data.reduce((accumulator, current_value) => {
		if (!Object.hasOwn(accumulator, current_value.id)) {
			current_value.count = 1;
			accumulator[current_value.id] = current_value;
		} else {
			accumulator[current_value.id].count = accumulator[current_value.id].count + 1;
		}

		return accumulator;
	}, {});

	return Object.values(new_item_data);
}