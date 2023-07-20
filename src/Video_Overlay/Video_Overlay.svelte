<script>
	import { onMount } from 'svelte';
	import { game_data, game_translations } from './../stores.js';
	import Container_Weapons from './../Components/Container_Weapons/Container_Weapons.svelte';
	import Container_Stats from './../Components/Container_Stats/Container_Stats.svelte';
	import Container_Items from './../Components/Container_Items/Container_Items.svelte';

	// let id = undefined;

	// onMount(() => {
	// 		window.Twitch.ext.onAuthorized(function () {
	// 				const config = window.Twitch.ext.configuration.broadcaster.content;
	// 				id = new URL(config).pathname.split("/")[2];
	// 		});
	// });

	async function get_game_data() {
		// Get Data
		const result = await fetch('/static/test_data.json');
		const data = await result.json();

		// Load into game_data store
		$game_data.items = data.items;
		delete data.items;
		$game_data.weapons = data.weapons;
		delete data.weapons;

		// Get primary stats
		for (const [key, value] of Object.entries(data)) {
			if (key.startsWith('stat')) {
				$game_data.stats_primary[key] = value;
			} else {
				$game_data.stats_secondary[key] = value;
			}
		}

		console.log($game_data);
	}

	async function get_game_translations() {
		// Get Data
		const result = await fetch('/static/translations.json');
		const data = await result.json();

		// Add it to the translations store
		$game_translations = data;

		console.log($game_translations);
	}

	onMount(async () => {
		get_game_data();
		get_game_translations();
	});
</script>

<div class="overlay">
	<div class="container_stats">
		<Container_Stats />
	</div>
	<div class="container_items">
		<Container_Items />
	</div>
	<div class="container_weapons">
		<Container_Weapons />
	</div>
</div>

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
	}
</style>
