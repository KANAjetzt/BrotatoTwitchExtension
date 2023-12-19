let temp_image_base64 = {};

let game_data = {
	stats_primary: {},
	stats_secondary: {},
	items: [],
	weapons: [],
	stored_images: {},
	handled_actions: {}
};

export function data_handler(data) {
	data.forEach((update_data) => {
		const { id, action} = update_data;

		// Skip if the action has been handled in the past
		if(id !== "" && Object.hasOwn(game_data.handled_actions, id)){
			return
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
			case 'image_upload_start':
				image_upload_start(update_data);
				break;
			case 'image_upload_end':
				image_upload_end(update_data);
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
	const {id, data} = update_data;

	game_data?.items.push(data);
	game_data.handled_actions[id] = data
}

function weapon_added(update_data) {
	const { id, data} = update_data;

	game_data?.weapons.push(data);
	game_data.handled_actions[id] = data
}

function weapon_removed(update_data) {
	const { id, data} = update_data;

	const index_to_remove = game_data.weapons.findIndex((weapon_data) => {
		if (weapon_data.tier === data.tier && weapon_data.id === data.id) {
			return true;
		}
		return false;
	});

	game_data.weapons.splice(index_to_remove, 1);
	game_data.handled_actions[id] = data
}

function stats_update(update_data) {
	const { id, data} = update_data;

	for (const [key, value] of Object.entries(data)) {
		if (key.startsWith('stat')) {
			game_data.stats_primary[key] = value;
		} else {
			game_data.stats_secondary[key] = value;
		}
	}
	game_data.handled_actions[id] = data
}

function image_upload(update_data) {
	const { id, data} = update_data;

	// Check if the image upload has started
	if(!Object.hasOwn(temp_image_base64, data.item_id)){
		return
	}

	temp_image_base64[data.item_id].push(data.base64_chunks);
	game_data.handled_actions[id] = data
}

function image_upload_start(update_data) {
	const { id, data} = update_data;

	temp_image_base64[data.item_id] = []
	temp_image_base64[data.item_id].push(data.base64_chunks);
	game_data.handled_actions[id] = data
}

function image_upload_end(update_data) {
	const { id, data} = update_data;

	const { item_id, base64_chunks } = data;

	// Check if the image upload has started
	if(!Object.hasOwn(temp_image_base64, item_id)){
		return
	}

	// Add the last image chunk
	temp_image_base64[item_id].push(base64_chunks);

	// Store the full base64 string in game_data
	game_data.stored_images[item_id] = temp_image_base64[item_id].join('');

	// Clear the temp image entry
	delete temp_image_base64[item_id]

	game_data.handled_actions[id] = data
	console.log(game_data);
}

function clear_all() {
	game_data = {
		stats_primary: {},
		stats_secondary: {},
		items: [],
		weapons: [],
		stored_images: {},
		handled_actions: {}
	};
}
