<script>
	import { fade } from 'svelte/transition';

	export let img_src = '';
	export let img_alt = '';
	export let tier = '';
</script>

<div class="item bg_{tier}" transition:fade={{ duration: 150 }}>
	<img src={img_alt !== '' ? img_src : '/static/blob.png'} alt={img_alt} />
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
