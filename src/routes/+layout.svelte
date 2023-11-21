<slot />

<style>
	/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

	@font-face {
		font-family: 'Anybody';
		src: url('fonts/Anybody-Medium/Anybody-Medium.eot');
		src: url('fonts/Anybody-Medium/Anybody-Medium.eot?#iefix') format('embedded-opentype'),
			url('fonts/Anybody-Medium/Anybody-Medium.woff2') format('woff2'),
			url('fonts/Anybody-Medium/Anybody-Medium.woff') format('woff'),
			url('fonts/Anybody-Medium/Anybody-Medium.ttf') format('truetype'),
			url('fonts/Anybody-Medium/Anybody-Medium.svg#Anybody-Medium') format('svg');
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}

	/* Document
   ========================================================================== */

	/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

	:global(html) {
		margin: 0;
		overflow: hidden;
		font-size: 100%; /* 1 rem = 10px; 10px/16px = 62.5% */
		line-height: 1.15; /* 1 */
		-webkit-text-size-adjust: 100%; /* 2 */
	}

	:global(:root) {
		--font-primary: Anybody;
		--font-color-primary: #eee;
		--font-color-secondary: #EAE2B0;
		--border-radius-primary: 10px;
		--animation-slide-in-values: 0.2s ease-in-out forwards;
		--item-img-size: 80px;
		--item-padding: 5px;
		--container-bg-color: hsla(0, 0%, 19%, 0.75);
		--btn-bg-color: hsla(0, 0%, 85%, 0.25);
		--item-bg-alpha: 0.4;
		--tooltip-bg-alpha: 1;
		--bg-0-values: 0, 0%, 90%;
		--bg-1-values: 204, 100%, 68%;
		--bg-2-values: 270, 100%, 68%;
		--bg-3-values: 0, 100%, 62%;
		--tooltip-bg-0-values: 0, 0%, 5%;
		--tooltip-bg-1-values: 197, 50.18%, 10.17%;
		--tooltip-bg-2-values: 261, 45.95%, 7.25%;
		--tooltip-bg-3-values: 0, 60%, 8.82%;
		--item-bg-0: hsla(var(--bg-0-values), var(--item-bg-alpha));
		--item-bg-1: hsla(var(--bg-1-values), var(--item-bg-alpha));
		--item-bg-2: hsla(var(--bg-2-values), var(--item-bg-alpha));
		--item-bg-3: hsla(var(--bg-3-values), var(--item-bg-alpha));
		--tooltip-bg-0: hsla(var(--tooltip-bg-0-values), var(--tooltip-bg-alpha));
		--tooltip-bg-1: hsla(var(--tooltip-bg-1-values), var(--tooltip-bg-alpha));
		--tooltip-bg-2: hsla(var(--tooltip-bg-2-values), var(--tooltip-bg-alpha));
		--tooltip-bg-3: hsla(var(--tooltip-bg-3-values), var(--tooltip-bg-alpha));
		--scrollbar-color-primary: hsla(0, 0%, 36%, 0.466);
		--scrollbar-color-secondary: hsla(0, 0%, 85%, 0.25);
		--scrollbar-color-secondary-a-50: hsla(0, 0%, 85%, 0.5);
	}

	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6),
	:global(p),
	:global(a),
	:global(button),
	:global(li) {
		font-family: var(--font-primary);
		margin: 0;
		padding: 0;
		color: var(--font-color-primary);
	}

	:global(h1) {
		font-size: 2em;
		margin: 0.67em 0;
	}

	/* --- Scrollbar --- */

	:global(.styled_scrollbar) {
		/* Foreground, Background */
		scrollbar-color: var(--scrollbar-color-secondary) var(--scrollbar-color-primary);
	}
	:global(.styled_scrollbar::-webkit-scrollbar) {
		width: 10px; /* Mostly for vertical scrollbars */
		height: 10px; /* Mostly for horizontal scrollbars */
	}
	:global(.styled_scrollbar::-webkit-scrollbar-thumb) {
		/* Foreground */
		border-radius: 10px;
		background-color: var(--scrollbar-color-secondary);
		background-image: -webkit-linear-gradient(
			90deg,
			transparent,
			--scrollbar-color-secondary-a-50,
			transparent,
			transparent
		);
	}
	:global(.styled_scrollbar::-webkit-scrollbar-track) {
		/* Background */
		background: var(--scrollbar-color-primary);
		border-radius: 10px;
	}

	/* Animations
	 ========================================================================== */

	@keyframes slide_in_right {
		from {
			transform: translate3d(500px, 0px, 0px);
		}

		to {
			transform: translate3d(0px, 0px, 0px);
		}
	}

	@keyframes slide_out_right {
		from {
			transform: translate3d(0px, 0px, 0px);
		}

		to {
			transform: translate3d(500px, 0px, 0px);
		}
	}

	@keyframes slide_in_down {
		from {
			transform: translate3d(0px, 500px, 0px);
		}

		to {
			transform: translate3d(0px, 0px, 0px);
		}
	}

	@keyframes slide_out_down {
		from {
			transform: translate3d(0px, 0px, 0px);
		}

		to {
			transform: translate3d(0px, 500px, 0px);
		}
	}

	@keyframes slide_in_left {
		from {
			transform: translate3d(-500px, 0px, 0px);
		}

		to {
			transform: translate3d(0px, 0px, 0px);
		}
	}

	@keyframes slide_out_left {
		from {
			transform: translate3d(0px, 0px, 0px);
		}

		to {
			transform: translate3d(-500px, 0px, 0px);
		}
	}
</style>
