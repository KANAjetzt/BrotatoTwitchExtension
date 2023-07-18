<script>
	export let img_src = ""
	export let img_alt = ""
	export let stat_text = ""
	export let stat_value = ""
</script>

<div class="info_stat">
	<img src={img_src} alt={img_alt}>
	<p>{stat_text}</p>
	<p>{stat_value}</p>
</div>


<style>
.info_stat {
	display: grid;
	grid-template-columns: min-content 1fr 1fr;
	align-items: center;
	gap: 1rem;
}

img {
	width: 1.5rem;
	height: 1.5rem;
}

</style>