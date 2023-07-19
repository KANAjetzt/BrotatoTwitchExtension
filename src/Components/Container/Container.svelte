<script>
	import BtnFold from "../Btn_Fold/Btn_Fold.svelte";

	function handle_btn_fold_click() {

	}
</script>

<div class="container">
<slot />
</div>
<div class="btn_fold">
	<BtnFold on:click={handle_btn_fold_click}/>
</div>


<style>
	.container {
		position: relative;
		padding: 2rem;
		background-color: #303030;
		border-radius: var(--border-radius-primary);
		filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.74));
		z-index: 100;
	}

	.btn_fold {
		position: absolute;
    right: 0rem;
    bottom: -2rem;
		z-index: 2;
	}
</style>