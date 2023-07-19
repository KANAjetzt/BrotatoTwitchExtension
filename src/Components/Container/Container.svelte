<div class="container">
<slot />
</div>

<style>
	.container {
		position: relative;
		padding: 2rem;
		background-color: #303030;
		border-radius: var(--border-radius-primary);
		filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.74));
		z-index: 100;
	}
</style>