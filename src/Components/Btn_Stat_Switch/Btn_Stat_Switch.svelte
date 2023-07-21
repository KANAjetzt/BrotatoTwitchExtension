<script>
	import { createEventDispatcher } from 'svelte';

	export let btn_text = '';

	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => {
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
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		font-family: var(--font-primary);
	}

	button:hover {
		cursor: pointer;
	}
</style>
