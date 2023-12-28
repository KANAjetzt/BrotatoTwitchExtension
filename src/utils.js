// stat_id = "stat_armor"
// stat icon = "armor.png"
export function get_stat_icon_name(stat_id) {
	return `${stat_id.replace('stat_', '')}.png`;
}

export function get_translated_string(translations, key, language_key) {
	key = key.toUpperCase();

	if (!Object.hasOwn(translations, key)) {
		return '';
	}

	return translations[key][language_key];
}

export function get_icon_path(item_id) {
	if (item_id.startsWith('item')) {
		if (item_id.startsWith('item_eyes_surgery')) {
			return `item_icons/eye_surgery.png`;
		}

		const item_name = item_id.replace('item_', '');
		return `item_icons/${item_name}_icon.png`;
	}
	if (item_id.startsWith('weapon')) {
		if (item_id.startsWith('weapon_cacti_club')) {
			return `weapon_icons/cactus_mace_icon.png`;
		}

		//weapon_hammer_3 | weapon_lightning_shiv_1
		const weapon_id_split = item_id.split('_');
		weapon_id_split.splice(0, 1);
		weapon_id_split.splice(weapon_id_split.length - 1, 1);

		return `weapon_icons/${weapon_id_split.join('_')}_icon.png`;
	}
	if (item_id.startsWith('character')) {
		return `character_icons/${item_id.replace('character_', '')}_icon.png`;
	}
}

// --- Local Storage Utils ---

export const local_storage_save = (data, key) => {
	const dataString = JSON.stringify(data);
	localStorage.setItem(key, dataString);
};

export const local_storage_get = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const local_storage_delete = (key) => {
	localStorage.removeItem(key);
};
