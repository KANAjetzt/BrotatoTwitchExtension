<script>
	import { fade } from 'svelte/transition';
	import { app_store } from './../../stores.js';

	export let id = '';
	export let name = '';
	export let set = '';
	export let img_src = '';
	export let tier = '';
	export let effect_text = '';
	export let stat_text = '';
	export let count = 1;
</script>

<div
	class="item bg_{tier}"
	on:pointerenter={(e) => {
		if ($app_store.show_tooltip == false) {
			var target_position = {
				x: e.target.getBoundingClientRect().x,
				y: e.target.getBoundingClientRect().y
			};

			$app_store.show_tooltip = true;

			$app_store.tooltip_data = {
				tier,
				img_src,
				name,
				set,
				effect_text,
				stat_text,
				position: target_position
			};
		}
	}}
	on:pointerleave={(e) => {
		if ($app_store.show_tooltip == true) {
			$app_store.show_tooltip = false;
		}
	}}
	transition:fade={{ duration: 150 }}
>
	<img src={img_src !== '' ? img_src : './blob.png'} alt={name === '' ? id : name} />
	{#if count > 1}
		<p>x{count}</p>
	{/if}
</div>

<style>
	img {
		width: var(--item-img-size);
		height: var(--item-img-size);
		grid-row: 1 / 4;
		grid-column: 1 / 4;
	}

	p {
		grid-row: 3 / 4;
		grid-column: 3 / 4;
		font-size: 24px;
	}

	.item {
		display: grid;
		align-items: center;
		justify-content: center;
		padding: var(--item-padding);
		border-radius: var(--border-radius-primary);
	}

	.bg_0 {
		background-color: var(--item-bg-0);
	}
	.bg_1 {
		background-color: var(--item-bg-1);
	}
	.bg_2 {
		background-color: var(--item-bg-2);
	}
	.bg_3 {
		background-color: var(--item-bg-3);
	}
</style>
