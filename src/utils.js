// stat_id = "stat_armor"
// stat icon = "armor.png"
export function get_stat_icon_name(stat_id) {
	return `${stat_id.replace('stat_', '')}.png`;
}
