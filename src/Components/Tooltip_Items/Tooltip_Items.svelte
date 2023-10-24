<script>
	import bbobHTML from '@bbob/html';
	import presetHTML5 from '@bbob/preset-html5';
	import { getUniqAttr } from '@bbob/plugin-helper';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let tier = '';
	export let img_src = '';
	export let name = '';
	export let effect_text = {};

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

	function handle_effect_text() {
		const effect_html = [];

		for (const effect_bbcode of Object.values(effect_text)) {
			effect_html.push(bbobHTML(effect_bbcode, my_preset()));
		}

		return effect_html;
	}
</script>

<div
	class={`tooltip tooltip_bg_${tier}`}
	transition:fly={{ duration: 150, y: 10, easing: cubicOut }}
>
	<div class="top" style={`position: `}>
		<img class={`bg_${tier}`} src={img_src !== '' ? img_src : '/static/blob.png'} alt={name} />
		<h4>{name}</h4>
	</div>
	<ul>
		{#each html_effect_text as effect_info_html}
			<li>{@html effect_info_html}</li>
		{/each}
	</ul>
</div>

<style>
	.tooltip {
		position: absolute;
		bottom: 8rem;
		padding: 1rem;
		min-width: 15rem;
		transform: translate3d(33%, 0, 0);
		background-color: #333333f0;
		border-radius: var(--border-radius-primary);
		display: grid;
		grid-template-rows: max-content 1fr;
		align-items: center;
		pointer-events: none;
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
