<script>
	import { game_data, game_translations } from '../../stores.js';
	import { get_stat_icon_name } from '../../utils.js';
	import BtnStatSwitch from '../Btn_Stat_Switch/Btn_Stat_Switch.svelte';
	import Container from '../Container/Container.svelte';
	import InfoStat from '../Info_Stat/Info_Stat.svelte';

	let data_stats_primary;
	let data_translations;

	async function get_game_data() {
		const data = await game_data.get();
		data_stats_primary = data.stats_primary;
	}

	async function get_translation_data() {
		const data = await game_translations.get();
		data_translations = data;
	}

	get_game_data();
	get_translation_data();
</script>

<div class="stats_container">
	<Container fold_direction="right">
		<div class="stats">
			<h2>Stats</h2>

			<section class="buttons">
				<BtnStatSwitch btn_text="Primary" />
				<BtnStatSwitch btn_text="Secondary" />
			</section>

			<div class="info_stats">
				{#if data_stats_primary}
					{#each Object.keys(data_stats_primary) as stat_primary}
						<InfoStat
							img_src={`static/stat_icons/${get_stat_icon_name(stat_primary)}`}
							stat_text={data_translations[`${stat_primary.toUpperCase()}`].en}
							stat_value={data_stats_primary[stat_primary]}
						/>
					{/each}
				{/if}
			</div>
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
		grid-template-columns: 1fr;
		grid-template-rows: max-content max-content 1fr;
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

	.info_stats {
		width: 100%;
		display: grid;
		row-gap: 0.5rem;
	}
</style>
