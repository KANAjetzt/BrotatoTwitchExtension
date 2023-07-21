<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import BtnFold from '../Btn_Fold/Btn_Fold.svelte';

	export let fold_direction;

	let is_folded = false;
	let show_is_folded_btn = false;

	function get_transition_values() {
		switch (fold_direction) {
			case 'right':
				return { x: 400, duration: 200, easing: quintOut };
				break;
			case 'down':
				return { y: 200, duration: 200, easing: quintOut };
				break;
			case 'left_top':
				return { x: -200, duration: 200, easing: quintOut };
				break;

			default:
				break;
		}
	}
</script>

<div
	class="container {is_folded ? `${fold_direction}_animate_out` : `${fold_direction}_animate_in`}"
>
	<slot />
</div>
<div
	class="btn_fold {fold_direction} {is_folded
		? `${fold_direction}_animate_out`
		: `${fold_direction}_animate_in`}"
	on:animationend={() => {
		if (is_folded) {
			show_is_folded_btn = true;
		}
	}}
>
	<BtnFold
		{fold_direction}
		{is_folded}
		on:click={(e) => {
			is_folded = !is_folded;
		}}
	/>
</div>

{#if show_is_folded_btn}
	<div
		class="btn_fold {fold_direction}"
		in:fly|local={get_transition_values()}
		out:fly|local={get_transition_values()}
		on:outroend={() => {
			is_folded = false;
		}}
	>
		<BtnFold
			{fold_direction}
			{is_folded}
			on:click={(e) => {
				show_is_folded_btn = false;
			}}
		/>
	</div>
{/if}

<style>
	.container {
		position: relative;
		padding: 2rem;
		background-color: var(--container-bg-color);
		border-radius: var(--border-radius-primary);
		backdrop-filter: blur(10px);
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

	.right_animate_in {
		animation: slide_in_right var(--animation-slide-in-values);
	}

	.right_animate_out {
		animation: slide_out_right var(--animation-slide-in-values);
	}

	.down_animate_in {
		animation: slide_in_down var(--animation-slide-in-values);
	}

	.down_animate_out {
		animation: slide_out_down var(--animation-slide-in-values);
	}

	.left_top_animate_in {
		animation: slide_in_left var(--animation-slide-in-values);
	}

	.left_top_animate_out {
		animation: slide_out_left var(--animation-slide-in-values);
	}

	.left {
		right: 0rem;
		bottom: -2rem;
	}

	.down {
		right: -2rem;
		bottom: 0;
	}

	.left_top {
		left: 0px;
		top: -2rem;
	}
</style>
