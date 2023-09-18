<script>
	import { fade } from 'svelte/transition';
	import TooltipItems from '../Tooltip_Items/Tooltip_Items.svelte';

	export let id = '';
	export let name = '';
	export let img_src = '';
	export let tier = '';
	export let effect_text = {};

	let show_tooltip = false;
</script>

<div
	class="item bg_{tier}"
	on:pointerenter={(e) => {
		if (show_tooltip == false) {
			show_tooltip = true;
		}
	}}
	on:pointerleave={(e) => {
		if (show_tooltip == true) {
			show_tooltip = false;
		}
	}}
	transition:fade={{ duration: 150 }}
>
	<img src={img_src !== '' ? img_src : '/static/blob.png'} alt={name === '' ? id : name} />
	{#if show_tooltip && !id.startsWith('weapon')}
		<TooltipItems {effect_text} {img_src} {name} {tier} />
	{/if}
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
