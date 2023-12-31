<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { game_data, game_translations } from '../../stores.js';
	import { get_stat_icon_name, get_translated_string } from '../../utils.js';
	import BtnStatSwitch from '../Btn_Stat_Switch/Btn_Stat_Switch.svelte';
	import Container from '../Container/Container.svelte';
	import InfoStat from '../Info_Stat/Info_Stat.svelte';

	$: data_stats_primary = stats_primary_sorting($game_data?.stats_primary);
	$: data_stats_secondary = stats_secondary_sorting($game_data?.stats_secondary);
	let data_translations;
	let current_stat_view = 'primary';

	async function get_translation_data() {
		const data = await game_translations.get();
		data_translations = data;
	}

	function stats_primary_sorting(stats_data) {
		if (!stats_data || Object.keys(stats_data).length === 0) {
			return;
		}
		return {
			stat_max_hp: stats_data.stat_max_hp,
			stat_hp_regeneration: stats_data.stat_hp_regeneration,
			stat_lifesteal: stats_data.stat_lifesteal,
			stat_percent_damage: stats_data.stat_percent_damage,
			stat_melee_damage: stats_data.stat_melee_damage,
			stat_ranged_damage: stats_data.stat_ranged_damage,
			stat_elemental_damage: stats_data.stat_elemental_damage,
			stat_attack_speed: stats_data.stat_attack_speed,
			stat_crit_chance: stats_data.stat_crit_chance,
			stat_engineering: stats_data.stat_engineering,
			stat_range: stats_data.stat_range,
			stat_armor: stats_data.stat_armor,
			stat_dodge: stats_data.stat_dodge,
			stat_speed: stats_data.stat_speed,
			stat_luck: stats_data.stat_luck,
			stat_harvesting: stats_data.stat_harvesting
		};
	}

	function stats_secondary_sorting(stats_data) {
		if (!stats_data || Object.keys(stats_data).length === 0) {
			return;
		}

		return {
			consumable_heal: [stats_data.consumable_heal, true],
			chance_heal_on_gold: [stats_data.heal_when_pickup_gold, true],
			xp_gain: [stats_data.xp_gain, true],
			pickup_range: [stats_data.pickup_range, true],
			items_price: [stats_data.items_price, false],
			explosion_damage: [stats_data.explosion_damage, true],
			explosion_size: [stats_data.explosion_size, true],
			bounce: [stats_data.bounce, true],
			piercing: [stats_data.piercing, true],
			piercing_damage: [stats_data.piercing_damage, true],
			damage_against_bosses: [stats_data.damage_against_bosses, true],
			burning_cooldown_reduction: [stats_data.burning_cooldown_reduction, true],
			burning_spread: [stats_data.burning_spread, true],
			knockback: [stats_data.knockback, true],
			chance_double_gold: [stats_data.chance_double_gold, true],
			item_box_gold: [stats_data.item_box_gold, true],
			free_rerolls: [stats_data.free_rerolls, true],
			trees: [stats_data.trees, true],
			number_of_enemies: [stats_data.number_of_enemies, true],
			enemy_speed: [stats_data.enemy_speed, false]
		};
	}

	get_translation_data();
</script>

<div class="stats_container">
	<Container fold_direction="right">
		<div class="stats">
			<h2>Stats</h2>

			<section class="buttons">
				<BtnStatSwitch
					btn_text="Primary"
					is_active={current_stat_view === 'primary' ? true : false}
					on:click={() => {
						current_stat_view = 'primary';
					}}
				/>
				<BtnStatSwitch
					btn_text="Secondary"
					is_active={current_stat_view === 'secondary' ? true : false}
					on:click={() => {
						current_stat_view = 'secondary';
					}}
				/>
			</section>

			{#if data_stats_primary && current_stat_view === 'primary'}
				<div
					class="info_stats_primary styled_scrollbar"
					transition:fly|local={{ x: 400, duration: 200, easing: quintOut }}
				>
					{#each Object.keys(data_stats_primary) as stat_primary}
						<InfoStat
							img_src={`./stat_icons/${get_stat_icon_name(stat_primary)}`}
							stat_text={data_translations[`${stat_primary.toUpperCase()}`].en}
							stat_value={data_stats_primary[stat_primary]}
						/>
					{/each}
				</div>
			{/if}
			{#if data_stats_secondary && current_stat_view === 'secondary'}
				<div
					class="info_stats_secondary styled_scrollbar"
					transition:fly|local={{ x: 400, duration: 200, easing: quintOut }}
				>
					{#each Object.keys(data_stats_secondary) as stat_secondary_key}
						<InfoStat
							stat_text={get_translated_string(data_translations, stat_secondary_key, 'en')}
							stat_value={data_stats_secondary[stat_secondary_key][0]}
							is_positive={data_stats_secondary[stat_secondary_key][1]}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</Container>
</div>

<style>
	.stats_container {
		grid-column: 3 / 4;
		position: relative;
		z-index: 2;
	}

	.stats {
		display: grid;
		/* fixed width ein height to prevent layout shift on panel change */
		grid-template-columns: 22rem;
		grid-template-rows: max-content max-content 34rem;
		align-items: center;
	}

	h2 {
		text-align: center;
		padding-bottom: 1.5rem;
	}

	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		padding-bottom: 2rem;
	}

	.info_stats_primary {
		row-gap: 0.3rem;
	}

	.info_stats_secondary {
		row-gap: 0.45rem;
		overflow-y: auto;
	}

	.info_stats_primary,
	.info_stats_secondary {
		width: 100%;
		height: 100%;
		display: grid;
		grid-column: 1 / 2;
		grid-row: 3 / 4;
		padding-right: 0.5rem;
	}

	@media only screen and (width <= 1385px) {
		.stats {
			grid-template-rows: max-content max-content 28rem;
		}
	}

	@media only screen and (width <= 1200px) {
		.stats {
			grid-template-rows: max-content max-content 24rem;
		}

		.info_stats_primary {
			overflow-y: auto;
		}
	}
</style>
