<script>
	import bbobHTML from '@bbob/html';
	import presetHTML5 from '@bbob/preset-html5';
	import { getUniqAttr } from '@bbob/plugin-helper';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { app_store } from './../../stores.js';

	let tooltip;
	let previous_item_name = '';

	$: html_effect_text = handle_effect_text();

	const my_preset = presetHTML5.extend((tags) => ({
		...tags,
		color: (node) => ({
			tag: 'color',
			attrs: {
				style: `color: ${getUniqAttr(node.attrs)}`
			},
			content: node.content
		})
	}));

	onMount(() => {
		position_tooltip();
	});

	app_store.subscribe((new_value) => {
		if (!tooltip) {
			return;
		}
		if (previous_item_name === '' || previous_item_name !== new_value.tooltip_data.name) {
			previous_item_name = new_value.tooltip_data.name;
			html_effect_text = handle_effect_text();
			position_tooltip();
		}

		previous_item_name = new_value.tooltip_data.name;
	});

	function position_tooltip() {
		tooltip.style.setProperty('--position-x', `${$app_store.tooltip_data.position.x}px`);
		tooltip.style.setProperty(
			'--position-y',
			`${$app_store.tooltip_data.position.y - tooltip.clientHeight}px`
		);
	}

	function handle_effect_text() {
		const effect_html = [];

		for (const effect_bbcode of Object.values($app_store.tooltip_data.effect_text)) {
			effect_html.push(bbobHTML(effect_bbcode, my_preset()));
		}

		return effect_html;
	}
</script>

<div
	class={`tooltip tooltip_bg_${$app_store.tooltip_data.tier}`}
	transition:fly={{ duration: 150, y: 10, easing: cubicOut }}
	bind:this={tooltip}
>
	<div class="top">
		<img
			class={`bg_${$app_store.tooltip_data.tier}`}
			src={$app_store.tooltip_data.img_src !== ''
				? $app_store.tooltip_data.img_src
				: '/static/blob.png'}
			alt={$app_store.tooltip_data.name}
		/>
		<h4>{$app_store.tooltip_data.name}</h4>
	</div>
	<ul>
		{#each html_effect_text as effect_info_html}
			<li>{@html effect_info_html}</li>
		{/each}
	</ul>
</div>

<style>
	.tooltip {
		position: fixed;
		top: var(--position-y);
		left: var(--position-x);
		padding: 1rem;
		min-width: 15rem;
		max-width: 20rem;
		background-color: #333333f0;
		border-radius: var(--border-radius-primary);
		display: grid;
		grid-template-rows: max-content 1fr;
		align-items: center;
		pointer-events: none;
		z-index: 200;
	}

	.top {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	img {
		width: var(--item-img-size);
		height: var(--item-img-size);
		padding: 0.5rem;
		border-radius: var(--border-radius-primary);
	}

	h4 {
		justify-self: start;
	}

	ul {
		margin: 0;
		padding: 1rem;
	}

	li {
		list-style: none;
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

	.tooltip_bg_0 {
		background-color: var(--tooltip-bg-0);
	}
	.tooltip_bg_1 {
		background-color: var(--tooltip-bg-1);
	}
	.tooltip_bg_2 {
		background-color: var(--tooltip-bg-2);
	}
	.tooltip_bg_3 {
		background-color: var(--tooltip-bg-3);
	}
</style>
