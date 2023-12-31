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
		position: {},
		index: -1
	},
	item_container_rows: '1',
	item_container_sorting: 'received'
});

export const game_data = writable({
	stats_primary: {},
	stats_secondary: {},
	items: {},
	weapons: [],
	stored_images: {},
	handled_actions: {}
});

export const items_by_count = derived(game_data, ($game_data) => {
	const items = Object.values($game_data.items);

	return items.sort((a, b) => b.count - a.count);
});

export const items_by_tier = derived(game_data, ($game_data) => {
	const items = Object.values($game_data.items);

	return items.sort((a, b) => b.tier - a.tier);
});

export const items_sorted = derived(
	[app_store, game_data, items_by_count, items_by_tier],
	([$app_store, $game_data, $items_by_count, $items_by_tier]) => {
		switch ($app_store.item_container_sorting) {
			case 'received':
				return Object.values($game_data.items);
			case 'count':
				return $items_by_count;
			case 'tier':
				return $items_by_tier;
		}
	}
);

export const game_translations = asyncable(async () => {
	// Get Data
	const result = await fetch('translations.json');
	const data = result.json();

	return data;
});
