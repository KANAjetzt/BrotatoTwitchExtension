<script>
  export let rotate = 0
</script>


  <div class="icon {`rotate_${rotate}deg`}">
    <slot />
  </div>

<style>
  .icon {
    filter: drop-shadow(var(--shadow-1));
  }

	.rotate_0deg {
		transform: rotate(0deg);
	}

	.rotate_90deg {
		transform: rotate(90deg);
	}

	.rotate_180deg {
		transform: rotate(180deg);
	}

	.rotate_270deg {
		transform: rotate(270deg);
	}
</style>