<script>
	import Container_Stats from './../Components/Container_Stats/Container_Stats.svelte';

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

	<Container_Stats />

</div>


<style>
	.overlay {
		display: grid;
		grid-template-columns: max-content 1fr max-content;
		width: 100vw;
		height: 100vh;
		align-items: center;
	}
</style>