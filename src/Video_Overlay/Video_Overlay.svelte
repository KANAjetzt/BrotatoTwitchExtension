<script>
	import { onMount } from 'svelte';
	import { game_data, game_translations } from './../stores.js';
	import Container_Stats from './../Components/Container_Stats/Container_Stats.svelte';
	import Container_Items from './../Components/Container_Items/Container_Items.svelte';

	// let id = undefined;

	// onMount(() => {
	// 		window.Twitch.ext.onAuthorized(function () {
	// 				const config = window.Twitch.ext.configuration.broadcaster.content;
	// 				id = new URL(config).pathname.split("/")[2];
	// 		});
	// });

	let promise = Promise.all([$game_data, $game_translations]);

	export let data_game;
	export let data_translations;

	async function get_game_data() {
		const data = await game_data.get();
		data_game = data;
	}

	async function get_translation_data() {
		const data = await game_translations.get();
		data_translations = data;
	}

	get_game_data();
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
					data_items={data_game.items}
					{data_translations}
					fold_direction={'down'}
					heading={'Items'}
				/>
			</div>
			<div class="container_weapons">
				<Container_Items
					data_items={data_game.weapons}
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
		background-image: url('/static/test_bg.png');
		background-size: cover;
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
