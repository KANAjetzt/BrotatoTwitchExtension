<script>
	import Info_Item from '../Info_Item/Info_Item.svelte';
	import Container from "../Container/Container.svelte";
</script>


<div class="weapons_container">
	<Container fold_direction="left_top">
		<h2>Weapons</h2>
		<div class="weapons">
		<div class="weapon">
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

	.weapons_container {
		position: relative;
	}

	.weapons {
		display: grid;
		grid-template-columns: repeat(auto-fit, 80px);
	}

	.weapon {
		padding: 10px;
		background-color: red;
		border-radius: var(--border-radius-primary);
	}
</style>