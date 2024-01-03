<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import BtnFold from '../Btn_Fold/Btn_Fold.svelte';
	import Icon_Settings from '../icons/Settings.svelte';
	import Container_Items_Settings from '../Container_Items_Settings/Container_Items_Settings.svelte';

	export let fold_direction;
	export let is_show_settings = false;
	export let settings_options = undefined;
	export let settings_binds = undefined;

	let is_folded = false;
	let show_is_folded_btn = false;
	let is_settings_open = false;

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
	{#if is_show_settings}
		<button
			class="icon_settings"
			on:click={() => {
				is_settings_open = !is_settings_open;
			}}
		>
			<Icon_Settings width={21} height={21} fill={'#eee'} fill_opacity={0.8} />
		</button>
	{/if}

	<slot />
</div>
{#if is_settings_open}
	<Container_Items_Settings options={settings_options} binds={settings_binds} />
{/if}
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
		display: flex;
		flex-direction: column;
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

	.icon_settings {
		background-color: transparent;
		border: none;
		align-self: flex-end;
		cursor: pointer;
	}
</style>
