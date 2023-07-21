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
		return `/static/item_icons/${item_id.replace('item_', '')}_icon.png`;
	}
	if (item_id.startsWith('weapon')) {
		if (item_id === 'weapon_cacti_club') {
			return `/static/weapon_icons/cactus_mace_icon.png`;
		}

		return `/static/weapon_icons/${item_id.replace('weapon_', '')}_icon.png`;
	}
	if (item_id.startsWith('character')) {
		return `/static/character_icons/${item_id.replace('character_', '')}_icon.png`;
	}
}
