<script>
	import {createEventDispatcher} from 'svelte'
	import Icon_Arrow from "../icons/Arrow.svelte";

	export var is_folded = false

	const dispatch = createEventDispatcher()

</script>
<button class={is_folded ? "btn_folded" : ""} on:click={() => {
	dispatch('click')
}}>
	<div class={is_folded ? "folded" : "icon"}>
		<Icon_Arrow width={16} height={10} fill={"#eee"} rotate={is_folded ? 90 : 270}/>
	</div>
</button>

<style>
	button {
		border: none;
		border-radius: var(--border-radius-primary);
		padding: 1rem 2rem 0.5rem 2rem;
		background-color: #303030;
	}

	button:hover {
		cursor: pointer;
	}

	.btn_folded {
		margin-right: -0.5rem;
		padding: 1rem 2rem 1rem 2rem;
	}

	.icon {
		margin-right: -2.5rem;
	}

	.folded {
		margin-left: -1rem;
	}
</style>