<script>
	import { statefulSwap } from "../../stores"
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
	import BtnFold from "../Btn_Fold/Btn_Fold.svelte";

	// https://stackoverflow.com/a/65171909
	const {onOutro, transitionTo, state} = statefulSwap("is_not_folded")

	let is_folded = false
</script>

{#if $state === "is_not_folded"}
	<div
		class="container"
		in:fly|local={{x: 400, duration: 200, easing: quintOut}}
		out:fly|local={{x: 400, duration: 200}}
	>
	<slot />
	</div>
	<div
		class="btn_fold"
		in:fly|local={{x: 100, duration: 200, easing: quintOut}}
		out:fly|local={{x: 100, duration: 200, easing: quintOut}}
		on:outroend={onOutro}
	>
		<BtnFold {is_folded} on:click={e =>  {
				is_folded = !is_folded
				transitionTo("is_folded")
			}} />
	</div>
{:else if $state === "is_folded"}
	<div
		class="btn_fold"
		in:fly|local={{x: 100, duration: 200, easing: quintOut}}
		out:fly|local={{x: 100, duration: 200, easing: quintOut}}
		on:outroend={onOutro}
	>
		<BtnFold {is_folded} on:click={e =>  {
				transitionTo("is_not_folded")
				is_folded = !is_folded
			}} />
	</div>
{/if}


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