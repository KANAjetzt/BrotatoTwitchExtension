<script>
	export let img_src = '';
	export let img_alt = '';
	export let stat_text = '';
	export let stat_value = '';
	export let is_positive = undefined;

	function get_text_color(value) {
		if (is_positive === true && value > 0) {
			return 'green';
		} else if (is_positive === true && value > 0) {
			return 'red';
		}

		if (is_positive === false && value > 0) {
			return 'red';
		} else if (is_positive === false && value < 0) {
			return 'green';
		}

		if (value > 0) {
			return 'green';
		}
		if (value < 0) {
			return 'red';
		}

		return '';
	}
</script>

{#if stat_text}
	<div class="info_stat {img_src ? 'columns_three' : 'columns_two'}">
		{#if img_src}
			<img src={img_src} alt={img_alt} />
		{/if}
		{#if stat_text == 'Curse'}
			<p class="purple">{stat_text}</p>
			<p class="purple">{stat_value}</p>
		{:else}
			<p class={get_text_color(stat_value)}>{stat_text}</p>
			<p class={get_text_color(stat_value)}>{stat_value}</p>
		{/if}
	</div>
{/if}

<style>
	.info_stat {
		display: grid;
		align-items: center;
		gap: 1rem;
	}

	.columns_three {
		grid-template-columns: min-content 1fr 1fr;
	}
	.columns_two {
		grid-template-columns: 1fr max-content;
	}

	.green {
		color: lightgreen;
	}

	.red {
		color: lightcoral;
	}

	.purple {
		color: #ca61ff;
	}

	p:last-child {
		text-align: end;
	}

	img {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
