<script>
	import Container_Stats from './../Components/Container_Stats/Container_Stats.svelte';
	import Container_Items from './../Components/Container_Items/Container_Items.svelte';

	// import { onMount } from "svelte";

// let id = undefined;

// onMount(() => {
// 		window.Twitch.ext.onAuthorized(function () {
// 				const config = window.Twitch.ext.configuration.broadcaster.content;
// 				id = new URL(config).pathname.split("/")[2];
// 		});
// });
</script>

<div class="overlay">
	<div class="container_stats">
		<Container_Stats />
	</div>
	<div class="container_items">
		<Container_Items />
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
		grid-row: -1;
	}
</style>