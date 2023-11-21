<script>
	import { fade } from 'svelte/transition';
	import { app_store } from './../../stores.js';

	export let id = '';
	export let name = '';
	export let img_src = '';
	export let tier = '';
	export let effect_text = {};
</script>

<div
	class="item bg_{tier}"
	on:pointerenter={(e) => {
		if ($app_store.show_tooltip == false && !id.startsWith('weapon')) {
			var target_position = {
				x: e.target.getBoundingClientRect().x,
				y: e.target.getBoundingClientRect().y
			};

			$app_store.show_tooltip = true;

			$app_store.tooltip_data = {
				tier,
				img_src,
				name,
				effect_text,
				position: target_position
			};

			console.log($app_store.tooltip_data);
		}
	}}
	on:pointerleave={(e) => {
		if ($app_store.show_tooltip == true) {
			$app_store.show_tooltip = false;
		}
	}}
	transition:fade={{ duration: 150 }}
>
	<img src={img_src !== '' ? img_src : '/blob.png'} alt={name === '' ? id : name} />
</div>

<style>
	img {
		width: var(--item-img-size);
		height: var(--item-img-size);
	}

	.item {
		display: flex;
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
