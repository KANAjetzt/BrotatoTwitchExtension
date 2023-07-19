<script>
	import BtnStatSwitch from "../Btn_Stat_Switch/Btn_Stat_Switch.svelte";
	import Container from "../Container/Container.svelte";
	import InfoStat from "../Info_Stat/Info_Stat.svelte";
</script>


<div class="stats_container">
	<Container>
		<div class="stats">
		<h2>Stats</h2>

		<section class="buttons">
			<BtnStatSwitch btn_text="Primary" />
			<BtnStatSwitch btn_text="Secondary" />
		</section>

		<div class="info_stats">
		<InfoStat img_src="static/stat_icons/percent_damage.png" stat_text="damage" stat_value="10%"/>
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
		padding-bottom: 2rem;
	}

	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		padding-bottom: 2rem;
	}

	.info_stats {
		width: 100%;
	}


</style>