<script>
	import Info_Item from './../Info_Item/Info_Item.svelte';
	import Container from "../Container/Container.svelte";
</script>


<div class="items_container">
	<Container fold_direction="down">
		<h2>Items</h2>
		<div class="items">
		<div class="item">
			<Info_Item img_src={"/static/item_icons/acid_icon.png"} img_alt={"item acid"} />
		</div>
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
		grid-template-columns: repeat(auto-fit, 80px);
	}

	.item {
		padding: 10px;
		background-color: red;
		border-radius: var(--border-radius-primary);
	}
</style>