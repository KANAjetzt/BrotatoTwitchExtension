import { asyncable } from 'svelte-asyncable';
import { writable } from 'svelte/store';

export const app_store = writable({
	show_tooltip: false,
	tooltip_data: {
		tier: '',
		img_src: '',
		name: '',
		effect_text: {},
		position: {}
	}
});

export const game_data = writable({
	stats_primary: {},
	stats_secondary: {},
	items: [],
	weapons: []
});

// export const game_data = asyncable(async () => {
// const final_data = {
// 	stats_primary: {},
// 	stats_secondary: {},
// 	items: [],
// 	weapons: []
// };

// // Get Data
// const result = await fetch('/static/test_data.json');
// const data = await result.json();
// // Load into game_data store
// final_data.items = data.items;
// delete data.items;
// final_data.weapons = data.weapons;
// delete data.weapons;

// // Get primary stats
// for (const [key, value] of Object.entries(data)) {
// 	if (key.startsWith('stat')) {
// 		final_data.stats_primary[key] = value;
// 	} else {
// 		final_data.stats_secondary[key] = value;
// 	}
// }

// 	return final_data;
// });

export const game_translations = asyncable(async () => {
	// Get Data
	const result = await fetch('/static/translations.json');
	const data = result.json();

	return data;
});
