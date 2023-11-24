<script>
	import { get_translated_string, get_icon_path } from '../../utils.js';
	import Info_Item from './../Info_Item/Info_Item.svelte';
	import Container from '../Container/Container.svelte';
	import { game_data } from '../../stores.js';

	export let heading;
	export let fold_direction;
	export let data_items;
	export let data_translations;

	function handle_img_src(item_id) {
		// item_ids
		// weapon_hammer_3 | weapon_lightning_shiv_1 | item_bag | item_tree | kana_mysterious_medal | character_treasure_hunter
		let item_id_current = '';

		if (item_id.startsWith('weapon')) {
			const weapon_id_split = item_id.split('_');
			weapon_id_split.splice(weapon_id_split.length - 1, 1);
			item_id_current = weapon_id_split.join('_');
		}

		item_id_current = item_id;

		const translation_string = get_translated_string(data_translations, item_id_current, 'en');

		if (translation_string === '') {
			if ($game_data.stored_images[item_id]) {
				return `data:image/png;base64, ${$game_data.stored_images[item_id]}`;
			}

			return '';
		}

		return get_icon_path(item_id);
	}
</script>

<div class="items_container">
	<Container {fold_direction}>
		<h2>{heading}</h2>
		<div class="items styled_scrollbar">
			{#if data_items}
				{#each data_items as item}
					<Info_Item
						name={item.name}
						id={item.id}
						set={item.set ? item.set : ''}
						img_src={handle_img_src(item.id)}
						tier={item.tier}
						effect_text={item.effects}
						stat_text={item.stats}
						count={item.count}
					/>
				{/each}
			{/if}
		</div>
	</Container>
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
		max-height: 13rem;
		overflow-y: auto;
	}
</style>
