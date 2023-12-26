let temp_image_base64 = new Map();

let game_data = {
	stats_primary: {},
	stats_secondary: {},
	items: {},
	weapons: [],
	stored_images: {},
	handled_actions: {}
};

export function data_handler(data) {
	data.forEach((update_data) => {
		const { id, action } = update_data;

		// Skip if the action has been handled in the past
		if (id !== '' && Object.hasOwn(game_data.handled_actions, id)) {
			return;
		}

		switch (action) {
			case 'item_added':
				item_add(update_data);
				break;
			case 'weapon_added':
				weapon_added(update_data);
				break;
			case 'weapon_removed':
				weapon_removed(update_data);
				break;
			case 'stats_update':
				stats_update(update_data);
				break;
			case 'image_upload':
				image_upload(update_data);
				break;
			case 'clear_all':
				clear_all();
				break;
			default:
				console.log('I should not be here (⊙_⊙;)');
				break;
		}
	});

	return game_data;
}

function item_add(update_data) {
	const { id, data } = update_data;

	const existing_item_data = game_data.items[data.id];

	// Check if item already exists and current item count is smaller then new count or there is no item data yet.
	if ((existing_item_data && existing_item_data.count < data.count) || !existing_item_data) {
		game_data.items[data.id] = data;
	}

	game_data.handled_actions[id] = data;
}

function weapon_added(update_data) {
	const { id, data } = update_data;

	game_data?.weapons.push(data);
	game_data.handled_actions[id] = data;
}

function weapon_removed(update_data) {
	const { id, data } = update_data;

	const index_to_remove = game_data.weapons.findIndex((weapon_data) => {
		if (weapon_data.tier === data.tier && weapon_data.id === data.id) {
			return true;
		}
		return false;
	});

	game_data.weapons.splice(index_to_remove, 1);
	game_data.handled_actions[id] = data;
}

function stats_update(update_data) {
	const { id, data } = update_data;

	for (const [key, value] of Object.entries(data)) {
		if (key.startsWith('stat')) {
			game_data.stats_primary[key] = value;
		} else {
			game_data.stats_secondary[key] = value;
		}
	}
	game_data.handled_actions[id] = data;
}

function image_upload(update_data) {
	const { id, data } = update_data;
	const { item_id, base64_chunk, base64_chunk_index, base64_chunk_count } = data;

	// Initialize Map for temp image data
	if (!temp_image_base64.has(item_id)) {
		temp_image_base64.set(item_id, new Map());
	}

	// Add the image chunk to the temp image data
	temp_image_base64.get(item_id).set(base64_chunk_index, base64_chunk);

	// Check if image is complete
	if (temp_image_base64.get(item_id).size === base64_chunk_count) {
		// Order the chunks based on the index
		const sorted_image_array = Array.from(temp_image_base64.get(item_id).entries()).sort(
			(a, b) => a[0] - b[0]
		);

		// Extract values from the sorted array
		const sorted_values = sorted_image_array.map((entry) => entry[1]);

		// Store the final base64
		game_data.stored_images[item_id] = sorted_values.join('');
	}

	game_data.handled_actions[id] = data;
}

function clear_all() {
	game_data = {
		stats_primary: {},
		stats_secondary: {},
		items: {},
		weapons: [],
		stored_images: {},
		handled_actions: {}
	};
}
