import { local_storage_save, local_storage_get } from './utils';

let is_images_loaded_from_local_storage = false;
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
	// Load images from local storage
	if (!is_images_loaded_from_local_storage) {
		const local_storage_image_data = local_storage_get('images');
		if (local_storage_image_data) {
			game_data.stored_images = local_storage_get('images');
		}
		is_images_loaded_from_local_storage = true;
	}

	data.forEach((update_data) => {
		const { id: uuid, action } = update_data;

		if (uuid !== '' && Object.hasOwn(game_data.handled_actions, uuid)) {
			const { data } = update_data;
			let { id, effects, stats } = data;

			// Handle item effect text update
			if (action == 'item_added') {
				if (id.includes('cursed')) {
					game_data.items[id].effects = effects;
				} else {
					game_data.items[id].effects = effects;
				}
			}
			// Handle weapon effect and stat text update
			if (action == 'weapon_added') {
				const weapons_with_id = game_data.weapons.filter((weapon_data) => weapon_data.id == id);

				weapons_with_id.forEach((weapon) => {
					weapon.stats = stats;
					weapon.effects = effects;
				});
			}

			// Skip the rest if the action has been handled in the past
			return game_data;
		}

		switch (action) {
			case 'item_added':
				item_add(update_data);
				break;
			case 'item_removed':
				item_removed(update_data);
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

function item_removed(update_data) {
	const { id, data } = update_data;

	if (game_data.items[data.id]) {
		if (game_data.items[data.id].count == 1) {
			delete game_data.items[data.id];
			console.log(`item ${data.id} deleted`);
		} else {
			game_data.items[data.id].count -= 1;
			console.log(`item ${data.id} count - 1`);
		}
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

	// Check if the image is already saved
	if (Object.hasOwn(game_data.stored_images, item_id)) {
		return;
	}

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

		// Update local storage
		const image_data_local_storage = local_storage_get('images');
		let image_data_to_save = game_data.stored_images;

		if (image_data_local_storage) {
			image_data_to_save = { ...image_data_local_storage, ...game_data.stored_images };
		}

		local_storage_save(image_data_to_save, 'images');
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

	is_images_loaded_from_local_storage = false;
}
