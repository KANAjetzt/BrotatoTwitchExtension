<script>
	import { onMount } from 'svelte';
	import { app_store, game_data, game_translations } from '../../stores.js';
	import { data_handler } from '../../data_handler.js';
	import Container_Stats from '../../Components/Container_Stats/Container_Stats.svelte';
	import Container_Items from '../../Components/Container_Items/Container_Items.svelte';
	import Tooltip_Items from '../../Components/Tooltip_Items/Tooltip_Items.svelte';

	export let data_translations;

	function modulate_item_data(item_data) {
		// Count all multiples of items
		const new_item_data = item_data.reduce((accumulator, current_value) => {
			if (!accumulator.hasOwnProperty(current_value.id)) {
				current_value.count = 1;
				accumulator[current_value.id] = current_value;
			} else {
				accumulator[current_value.id].count = accumulator[current_value.id].count + 1;
			}

			return accumulator;
		}, {});

		return Object.values(new_item_data);
	}

	onMount(async () => {
		console.log('mounting');

		const data = await game_translations.get();
		data_translations = data;

		window.Twitch.ext.listen('broadcast', (target, contentType, message) => {
			console.log('listening');
			console.log(message);

			const data = JSON.parse(message);

			let new_game_data = data_handler(data);

			new_game_data.items = modulate_item_data(new_game_data.items);

			$game_data = new_game_data;
		});
	});
</script>

{#if data_translations}
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
		{#if $app_store.show_tooltip}
			<Tooltip_Items />
		{/if}
	</div>
{/if}

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
