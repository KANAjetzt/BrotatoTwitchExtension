<script>
	export let img_src = '';
	export let img_alt = '';
	export let tier = '';
</script>

<div class="item bg_{tier}">
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
		background-color: #e6e6e6;
	}
	.bg_1 {
		background-color: #5abeff;
	}
	.bg_2 {
		background-color: #ad5aff;
	}
	.bg_3 {
		background-color: #ff3b3b;
	}
</style>
