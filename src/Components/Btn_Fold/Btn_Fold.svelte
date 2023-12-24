<script>
	import { createEventDispatcher } from 'svelte';
	import Icon_Arrow from '../icons/Arrow.svelte';

	export let fold_direction;
	export let is_folded = false;

	const dispatch = createEventDispatcher();

	function get_arrow_deg() {
		switch (fold_direction) {
			case 'right':
				return is_folded ? 90 : 270;
				break;
			case 'down':
				return is_folded ? 180 : 0;
				break;
			case 'left_top':
				return is_folded ? 270 : 90;
				break;
			default:
				break;
		}
	}
</script>

<button
	class={`btn_${fold_direction} ${is_folded ? `btn_folded_${fold_direction}` : ''}`}
	on:click={() => {
		dispatch('click');
	}}
>
	<div class={is_folded ? `icon_folded_${fold_direction}` : `icon_${fold_direction}`}>
		<Icon_Arrow width={16} height={10} fill={'#eee'} rotate={get_arrow_deg()} />
	</div>
</button>

<style>
	button {
		border: none;
		border-radius: var(--border-radius-primary);

		background-color: #303030;
	}

	button:hover {
		cursor: pointer;
	}

	.btn_right {
		padding: 1rem 2rem 0.5rem 2rem;
	}

	.btn_down {
		padding: 3rem 0.5rem 0.3rem 2rem;
	}

	.btn_left_top {
		padding: 0.5rem 2rem 1rem 0.5rem;
	}

	.btn_folded_right {
		margin-right: -0.5rem;
		padding: 1rem 2rem 1rem 2rem;
	}

	.btn_folded_down {
		margin-bottom: -0.5rem;
		padding: 3.5rem 2rem 1.5rem 2rem;
	}

	.btn_folded_left_top {
		margin-left: -0.5rem;
		padding: 1.5rem 0.5rem 1.5rem 2rem;
	}

	.icon_right {
		margin-right: -2.5rem;
	}

	.icon_folded_right {
		margin-left: -1rem;
	}

	.icon_folded_down {
		margin-top: -3rem;
	}
</style>
