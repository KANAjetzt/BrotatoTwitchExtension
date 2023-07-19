<script>
	export let img_src = ""
	export let img_alt = ""
</script>

<div class="info_item">
	<img src={img_src} alt={img_alt}>
</div>


<style>

.info_item {
	background-color: red;
}
img {
	width: 60px;
	height: 60px;
}

</style>