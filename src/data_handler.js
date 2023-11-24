let temp_image_base64 = [];

let game_data = {
	stats_primary: {},
	stats_secondary: {},
	items: [],
	weapons: [],
	stored_images: {}
};

export async function data_handler(data) {
	data.forEach((update_data) => {
		const { action, data } = update_data;
		switch (action) {
			case 'item_added':
				item_add(data);
				break;
			case 'weapon_added':
				weapon_added(data);
				break;
			case 'weapon_removed':
				weapon_removed(data);
				break;
			case 'stats_update':
				stats_update(data);
				break;
			case 'image_upload':
				image_upload(data);
				break;
			case 'image_upload_start':
				image_upload_start(data);
				break;
			case 'image_upload_end':
				image_upload_end(data);
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

function item_add(data) {
	game_data?.items.push(data);
}

function weapon_added(data) {
	game_data?.weapons.push(data);
}

function weapon_removed(data) {
	const index_to_remove = game_data.weapons.findIndex((weapon_data) => {
		if (weapon_data.tier === data.tier && weapon_data.id === data.id) {
			return true;
		}
		return false;
	});

	game_data.weapons.splice(index_to_remove, 1);
}

function stats_update(data) {
	for (const [key, value] of Object.entries(data)) {
		if (key.startsWith('stat')) {
			game_data.stats_primary[key] = value;
		} else {
			game_data.stats_secondary[key] = value;
		}
	}
}

function image_upload(data) {
	temp_image_base64.push(data.base64_chunks);
}

function image_upload_start(data) {
	temp_image_base64.push(data.base64_chunks);
}

function image_upload_end(data) {
	const { item_id, base64_chunks } = data;
	temp_image_base64.push(base64_chunks);
	game_data.stored_images[item_id] = temp_image_base64.join('');
	temp_image_base64 = [];
	console.log(game_data);
}

function clear_all() {
	game_data = {
		stats_primary: {},
		stats_secondary: {},
		items: [],
		weapons: [],
		stored_images: {}
	};
}
