<script>
	import { statefulSwap } from "../../stores"
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
	import BtnFold from "../Btn_Fold/Btn_Fold.svelte";

	export let fold_direction

	// https://stackoverflow.com/a/65171909
	const {onOutro, transitionTo, state} = statefulSwap("is_not_folded")

	let is_folded = false

	function get_transition_values() {
		switch (fold_direction) {
			case "right":
				return {x: 400, duration: 200, easing: quintOut}
				break;
			case "down":
			return {y: 200, duration: 200, easing: quintOut}
			break;
			default:
				break;
		}
	}
</script>

{#if $state === "is_not_folded"}
	<div
		class="container"
		in:fly|local={get_transition_values()}
		out:fly|local={get_transition_values()}
	>
	<slot />
	</div>
	<div
		class="btn_fold {fold_direction}"
		in:fly|local={get_transition_values()}
		out:fly|local={get_transition_values()}
		on:outroend={onOutro}
	>
		<BtnFold {fold_direction} {is_folded} on:click={e =>  {
				is_folded = !is_folded
				transitionTo("is_folded")
			}} />
	</div>
{:else if $state === "is_folded"}
	<div
		class="btn_fold {fold_direction}"
		in:fly|local={get_transition_values()}
		out:fly|local={get_transition_values()}
		on:outroend={onOutro}
	>
		<BtnFold {fold_direction} {is_folded} on:click={e =>  {
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
		z-index: 2;
	}

	.right {
		right: 0rem;
    bottom: -2rem;
	}

	.left {
		right: 0rem;
    bottom: -2rem;
	}

	.down {
		right: -2rem;
    bottom: 0;
	}
</style>