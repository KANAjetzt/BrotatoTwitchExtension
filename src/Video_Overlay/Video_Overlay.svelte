<script>
	import { onMount } from 'svelte';
	import { app_store, game_data, items_sorted, game_translations } from './../stores.js';
	import { data_handler } from './../data_handler.js';
	import Container_Stats from './../Components/Container_Stats/Container_Stats.svelte';
	import Container_Items from './../Components/Container_Items/Container_Items.svelte';
	import Tooltip_Items from './../Components/Tooltip_Items/Tooltip_Items.svelte';

	export let data_translations;
	let promise = Promise.all([$game_translations]);

	onMount(async () => {
		const data = await game_translations.get();
		data_translations = data;

		window.Twitch.ext.listen('broadcast', async (target, contentType, message) => {
			const data = JSON.parse(message);

			let new_game_data = data_handler(data);

			$game_data = new_game_data;
		});
	});

	async function get_translation_data() {
		const data = await game_translations.get();
		data_translations = data;
	}

	get_translation_data();
</script>

{#await promise}
	<p>...waiting...</p>
{:then}
	{#if data_translations}
		<div class="overlay">
			<div class="container_stats">
				<Container_Stats
					is_show_settings={true}
					settings_options={{
						clear_cache: false,
						sort: false,
						rows: false,
						rows_max: 2,
						auto_fold: true
					}}
					settings_binds={{
						auto_fold: 'stats'
					}}
				/>
			</div>
			<div class="container_items">
				<Container_Items
					data_items={$items_sorted}
					{data_translations}
					fold_direction={'down'}
					heading={'Items'}
					rows={$app_store.item_container_rows}
					is_show_settings={true}
					settings_binds={{
						rows: 'item_container_rows',
						sorting: 'item_container_sorting',
						auto_fold: 'items'
					}}
					use_keyed_each={true}
				/>
			</div>
			<div class="container_weapons">
				<Container_Items
					data_items={$game_data.weapons}
					{data_translations}
					fold_direction={'left_top'}
					heading={'Weapons'}
					rows={$app_store.weapon_container_rows}
					is_show_settings={true}
					settings_binds={{
						rows: 'weapon_container_rows',
						auto_fold: 'weapons'
					}}
					settings_options={{
						clear_cache: false,
						sort: false,
						rows: true,
						rows_max: 2,
						auto_fold: true
					}}
				/>
			</div>
			{#if $app_store.show_tooltip}
				<Tooltip_Items />
			{/if}
		</div>
	{/if}
{/await}

<style>
	.overlay {
		display: grid;
		grid-template-columns: max-content 1fr max-content;
		grid-template-rows: 1fr 1fr 1fr;
		width: 100vw;
		height: 100vh;
		align-items: center;
	}

	.container_stats {
		grid-column: 3 / 4;
		grid-row: 1 / 5;
	}

	.container_items {
		grid-column: 1 / 3;
		grid-row: 4 / 5;
		z-index: 5;
	}

	.container_weapons {
		grid-column: 1 / 2;
		grid-row: 3 / 4;
		align-self: end;
		z-index: 2;
		width: 25rem;
	}

	@media only screen and (width <= 1460px) {
		.container_stats {
			align-self: end;
			margin-bottom: 4rem;
		}
	}
</style>
