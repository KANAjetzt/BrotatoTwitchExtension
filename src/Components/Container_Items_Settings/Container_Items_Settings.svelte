<script>
	import { local_storage_delete } from './../../utils.js';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { app_store } from '../../stores.js';

	function clear_local_storage() {
		// Right now only the images are stored in local storage
		local_storage_delete('images');
	}
</script>

<div class="settings" transition:fly={{ duration: 300, y: 300, opacity: 0, easing: quintOut }}>
	<div class="rows select">
		<label for="row_count">Row Count</label>
		<select name="row_count" id="row_count" bind:value={$app_store.item_container_rows}>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
	</div>
	<div class="sort select">
		<label for="sort_by">Sort by</label>
		<select name="sort_by" id="sort_by" bind:value={$app_store.item_container_sorting}>
			<option value="received">received</option>
			<option value="tier">tier</option>
			<option value="count">count</option>
		</select>
	</div>
	<button
		on:click={() => {
			clear_local_storage();
		}}>Clear Cache</button
	>
</div>

<style>
	.settings {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 2rem 2rem 3rem 2rem;
		background-color: var(--container-bg-color);
		border-radius: var(--border-radius-primary);
		backdrop-filter: blur(10px);
		filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.74));
		z-index: 1;
		transform: translateY(-95%);
	}

	.select {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
	}

	label {
		font-family: var(--font-primary);
		color: var(--font-color-primary);
	}

	select {
		font-family: var(--font-primary);
		color: var(--font-color-primary);
		cursor: pointer;
		display: inline-block;
		position: relative;
		font-size: 16px;
		padding: 0.5rem 2rem;
		border: none;
		box-shadow: 0 2px 0 var(--font-color-secondary);
		background-color: transparent;
	}

	option {
		background-color: var(--container-bg-color);
	}

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
</style>
