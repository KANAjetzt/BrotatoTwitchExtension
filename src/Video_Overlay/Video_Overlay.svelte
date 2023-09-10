<script>
	import { onMount } from 'svelte';
	import { game_data, game_translations } from './../stores.js';
	import Container_Stats from './../Components/Container_Stats/Container_Stats.svelte';
	import Container_Items from './../Components/Container_Items/Container_Items.svelte';

	onMount(() => {
		console.log('mounted');

		setInterval(async () => {
			const result = await fetch('/static/twitch_data.json');
			const data = await result.json();

			// Update game_data store
			$game_data.items = data.items;
			$game_data.weapons = data.weapons;

			// Get primary stats
			for (const [key, value] of Object.entries(data)) {
				if (key.startsWith('stat')) {
					$game_data.stats_primary[key] = value;
				} else {
					$game_data.stats_secondary[key] = value;
				}
			}
		}, 1000 * 5);

		// window.Twitch.ext.listen('broadcast', (target, contentType, message) => {
		// 	console.log('listening');
		// 	console.log(message);

		// 	const data = JSON.parse(message);

		// 	// Update game_data store
		// 	game_data.items = data.items;
		// 	game_data.weapons = data.weapons;

		// 	// Get primary stats
		// 	for (const [key, value] of Object.entries(data)) {
		// 		if (key.startsWith('stat')) {
		// 			game_data.stats_primary[key] = value;
		// 		} else {
		// 			game_data.stats_secondary[key] = value;
		// 		}
		// 	}
		// });
	});

	let promise = Promise.all([$game_translations]);

	export let data_translations;

	async function get_translation_data() {
		const data = await game_translations.get();
		data_translations = data;
	}

	get_translation_data();
</script>

{#await promise}
	<p>...waiting...</p>
{:then data}
	{#if data}
		<div class="overlay">
			<div class="container_stats">
				<Container_Stats />
			</div>
			<div class="container_items">
				<Container_Items
					data_items={$game_data.items}
					{data_translations}
					fold_direction={'down'}
					heading={'Items'}
				/>
			</div>
			<div class="container_weapons">
				<Container_Items
					data_items={$game_data.weapons}
					{data_translations}
					fold_direction={'left_top'}
					heading={'Weapons'}
				/>
			</div>
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
		grid-row: 1 / -1;
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
</style>
