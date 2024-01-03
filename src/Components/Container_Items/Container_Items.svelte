<script>
	import { spring } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { game_data } from '../../stores.js';
	import { get_translated_string, get_icon_path } from '../../utils.js';
	import Info_Item from './../Info_Item/Info_Item.svelte';
	import Container from '../Container/Container.svelte';

	export let heading;
	export let fold_direction;
	export let data_items;
	export let data_translations;
	export let rows = 1;
	export let is_show_settings = false;
	export let settings_options = undefined;
	export let settings_binds = undefined;
	export let use_keyed_each = false;

	let container_wrapper;

	const heightSpring = spring(0, { stiffness: 0.1, damping: 0.3 });
	$: heightStore = syncHeight(container_wrapper);
	$: heightSpring.set(open ? $heightStore || 0 : 0);

	function handle_img_src(item) {
		// item_ids
		// weapon_hammer_3 | weapon_lightning_shiv_1 | item_bag | item_tree | kana_mysterious_medal | character_treasure_hunter
		let item_id_current = item.id;

		if (item_id_current.startsWith('weapon')) {
			item_id_current = item.weapon_id;
		}

		const translation_string = get_translated_string(data_translations, item_id_current, 'en');

		if (translation_string === '') {
			if ($game_data.stored_images[item_id_current]) {
				return `data:image/png;base64, ${$game_data.stored_images[item_id_current]}`;
			}

			return '';
		}

		return get_icon_path(item_id_current);
	}

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 100),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 100,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	// https://svelte.dev/repl/5bc2b443f4194c3786942aabb828fdbf?version=3.30.0
	function syncHeight(element) {
		return writable(null, (set) => {
			if (!element) {
				return;
			}
			let resize_observer = new ResizeObserver(() => element && set(element.offsetHeight));
			resize_observer.observe(element);
			return () => resize_observer.disconnect();
		});
	}
</script>

<div class="items_container" style="height: {$heightSpring}px;">
	<div bind:this={container_wrapper}>
		<Container {fold_direction} {is_show_settings} {settings_binds} {settings_options}>
			<h2>{heading}</h2>
			<div class={`items styled_scrollbar row_${rows}`}>
				{#if data_items}
					{#if use_keyed_each}
						{#each data_items as item, index (item.id)}
							<div in:receive={{ key: item.id }} out:send={{ key: item.id }} animate:flip>
								<Info_Item
									name={item.name}
									id={item.id}
									set={item.set ? item.set : ''}
									img_src={handle_img_src(item)}
									tier={item.tier}
									effect_text={item.effects}
									stat_text={item.stats}
									count={item.count}
									{index}
								/>
							</div>
						{/each}
					{:else}
						{#each data_items as item, index}
							<Info_Item
								name={item.name}
								id={item.id}
								set={item.set ? item.set : ''}
								img_src={handle_img_src(item)}
								tier={item.tier}
								effect_text={item.effects}
								stat_text={item.stats}
								count={item.count}
								{index}
							/>
						{/each}
					{/if}
				{/if}
			</div>
		</Container>
	</div>
</div>

<style>
	h2 {
		text-align: center;
		padding-bottom: 1.5rem;
	}

	.items_container {
		position: relative;
	}

	.items {
		display: grid;
		grid-template-columns: repeat(auto-fit, calc(var(--item-img-size) + var(--item-padding) * 2));
		gap: 1rem;
		overflow-y: auto;
	}

	.row_1 {
		max-height: 6.5rem;
	}

	.row_2 {
		max-height: calc(6.5rem * 2);
	}

	.row_3 {
		max-height: calc(6.5rem * 3);
	}
</style>
