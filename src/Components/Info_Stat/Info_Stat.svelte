<script>
	export let img_src = ""
	export let img_alt = ""
	export let stat_text = ""
	export let stat_value = ""

	function get_text_color(value) {
		if(value > 0){
			return 'green'
		}
		if(value < 0){
			return 'red'
		}

		return ''
	}

</script>

<div class="info_stat {get_text_color(stat_value)}">
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

.green {
	color: green;
}

.red {
	color: red;
}

p:last-child {
	text-align: end;
}

img {
	width: 1.5rem;
	height: 1.5rem;
}

</style>