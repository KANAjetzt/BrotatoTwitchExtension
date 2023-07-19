<script>
	import Icon_Arrow from "../icons/Arrow.svelte";

</script>
<button>
	<div class="icon">
		<Icon_Arrow width={16} height={10} fill={"#eee"} rotate={270}/>
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

	.icon {
		margin-right: -2.5rem;
	}
</style>