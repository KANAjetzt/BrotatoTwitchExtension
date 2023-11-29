<script>
	import bbobHTML from '@bbob/html';
	import presetHTML5 from '@bbob/preset-html5';
	import * as plugin_helper from '@bbob/plugin-helper';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { app_store } from './../../stores.js';

	let tooltip;
	let previous_item_name = '';

	$: html_effect_text = handle_bb_code($app_store.tooltip_data.effect_text);
	$: html_stat_text = handle_bb_code($app_store.tooltip_data.stat_text);

	const my_preset = presetHTML5.extend((tags) => ({
		...tags,
		color: (node) => ({
			tag: 'color',
			attrs: {
				style: `color: ${plugin_helper.getUniqAttr(node.attrs)}`
			},
			content: node.content
		}),
		img: (node) => ({
			tag: 'img',
			attrs: {
				src: `${node.content}`,
				width: `${plugin_helper.getUniqAttr(node.attrs).split('x')[0]}px`,
				height: `${plugin_helper.getUniqAttr(node.attrs).split('x')[1]}px`,
				style: `margin-bottom: -5px`
			}
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
			html_effect_text = handle_bb_code($app_store.tooltip_data.effect_text);
			html_stat_text = handle_bb_code($app_store.tooltip_data.stat_text);
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

	function handle_bb_code(text) {
		if (!text) {
			return;
		}

		const html = [];
		const bb_code_split = text.split('\n');

		for (const bb_code of bb_code_split) {
			const bb_code_replaced_icon_path = bb_code.replaceAll('res://items/stats', 'stat_icons');
			html.push(bbobHTML(bb_code_replaced_icon_path, my_preset()));
		}

		return html;
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
			src={$app_store.tooltip_data.img_src !== '' ? $app_store.tooltip_data.img_src : './blob.png'}
			alt={$app_store.tooltip_data.name}
		/>
		<div class="right">
			<h4>{$app_store.tooltip_data.name}</h4>
			<h5>{$app_store.tooltip_data.set}</h5>
		</div>
	</div>
	{#if html_stat_text}
		<ul>
			{#each html_stat_text as stat_info_html}
				<li>{@html stat_info_html}</li>
			{/each}
		</ul>
	{/if}
	{#if html_effect_text}
		<ul>
			{#each html_effect_text as effect_info_html}
				<li>{@html effect_info_html}</li>
			{/each}
		</ul>
	{/if}
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
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 1rem;
	}

	img {
		width: var(--item-img-size);
		height: var(--item-img-size);
		padding: 0.5rem;
		border-radius: var(--border-radius-primary);
	}

	h4 {
		font-size: 1.3rem;
		font-weight: 300;
	}

	h5 {
		font-size: 1.1rem;
		font-weight: 300;
		color: var(--font-color-secondary);
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
