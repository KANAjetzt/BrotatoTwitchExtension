<script>
	export let btn_text = ""
</script>

<button>
{btn_text}
</button>

<style>

	button {
		border: none;
		border-radius: var(--border-radius-primary);
		padding: 1.0rem 1.8rem;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		font-family: var(--font-primary);
	}

	button:hover {
	cursor: pointer;
}

</style>