<script>
	import Counter from '$lib/Counter.svelte';
	import { session } from '$app/stores';
	import { post } from '$lib/utils.js';


	async function logout() {
		await post(`auth/logout`);

		// this will trigger a redirect, because it
		// causes the `load` function to run again
		$session.user = null;
	}
</script>

<main>

	<h1>Hello world!</h1>

	<Counter />

	<p>Visit <a href="/login">Login</a></p>

	<button class="btn btn-outline-danger" on:click={logout}> Or click here to logout. </button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 4rem auto;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 2rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>
