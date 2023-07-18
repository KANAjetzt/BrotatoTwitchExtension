<script>
	import BtnStatSwitch from "../Components/Btn_Stat_Switch/Btn_Stat_Switch.svelte";
	import Container from "../Components/Container/Container.svelte";
	import InfoStat from "../Components/Info_Stat/Info_Stat.svelte";

// import { onMount } from "svelte";

// let id = undefined;

// onMount(() => {
// 		window.Twitch.ext.onAuthorized(function () {
// 				const config = window.Twitch.ext.configuration.broadcaster.content;
// 				id = new URL(config).pathname.split("/")[2];
// 		});
// });
</script>

<Container>
	<h2>Stats</h2>

	<section class="buttons">
		<BtnStatSwitch btn_text="Primary" />
		<BtnStatSwitch btn_text="Secondary" />
	</section>

	<InfoStat img_src="static/stat_icons/percent_damage.png" stat_text="damage" stat_value="10%"/>

</Container>