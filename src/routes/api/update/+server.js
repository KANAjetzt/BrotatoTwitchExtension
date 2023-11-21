import { json } from '@sveltejs/kit';

let game_data = {
	stats_primary: {},
	stats_secondary: {},
	items: [],
	weapons: []
};

export async function GET() {
	return json(game_data);
}

export async function POST({ request }) {
	const data = await request.json();

	console.log(data);

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
			case 'weapon_combined':
				weapon_combined(data);
				break;
			case 'stats_update':
				stats_update(data);
				break;
			case 'clear_all':
				clear_all();
				break;
			default:
				console.log('I should not be here (⊙_⊙;)');
				break;
		}
	});

	return json(game_data);
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
	console.log(`removed weapon from idnex ${index_to_remove}`);
}

// 1 Weapon is removed if upgrade is bought directly from the shop
// 2 Weapons are removed if the combine button is pressed
// 1 Weapon of the higher tier is always added
function weapon_combined(data) {
	console.log('combine weapon');
	const { id, tier, remove_amount } = data;
	console.log(id, tier, remove_amount);
	for (let index = 0; index < remove_amount; index++) {
		console.log(`remove weapon ${(id, tier)}`);
		weapon_removed({ id, tier });
	}

	delete data.remove_amount;
	data.tier = tier + 1;

	weapon_added(data);
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

function clear_all() {
	game_data = {
		stats_primary: {},
		stats_secondary: {},
		items: [],
		weapons: []
	};
}
