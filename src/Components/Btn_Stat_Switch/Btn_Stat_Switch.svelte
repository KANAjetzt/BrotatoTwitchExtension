<script>
	import { createEventDispatcher } from 'svelte';

	export let btn_text = '';
	export let is_active;

	const dispatch = createEventDispatcher();
</script>

<button
	class={is_active ? 'is_active' : ''}
	on:click={() => {
		is_active = !is_active;
		dispatch('click');
	}}
>
	{btn_text}
</button>

<style>
	button {
		border: none;
		border-radius: var(--border-radius-primary);
		padding: 1rem 1.8rem;
		background-color: var(--btn-bg-color);
		box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.25);
		font-family: var(--font-primary);
		transition: box-shadow 0.2s ease-out;
	}

	button:hover {
		cursor: pointer;
	}

	.is_active {
		box-shadow: 4px 6px 5px 0px rgba(0, 0, 0, 0.35);
	}
</style>
