<script>
	import { goto } from '$app/navigation';
	import { AppwriteService, user } from '$lib/appwrite';
	import { onMount } from 'svelte';

	let email = '';
	let password = '';

	let notification = '';
	let check = true;

	onMount(async () => {
		let account = await AppwriteService.getAccount();
		if (account !== null) {
			check = false;
			goto('/user');
		}
	});

	function onLogin() {
		let promise = AppwriteService.login(email, password);
        
		promise.then(
			function (response) {
				console.log(response); // Success
				goto('/user');
			},
			function (error) {
				console.log(error); // Failure
				notification = error.message;
			}
		);
	}
</script>

{#if check}
	<form class="pt-5">
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<div class="form-floating mt-2">
			<input
				type="email"
				class="form-control"
				bind:value={email}
				id="floatingInput"
				placeholder="name@example.com"
			/>
			<label for="floatingInput">Email address</label>
		</div>
		<div class="form-floating mt-2">
			<input
				type="password"
				class="form-control"
				bind:value={password}
				id="floatingPassword"
				placeholder="Password"
			/>
			<label for="floatingPassword">Password </label>
		</div>
		{#if notification != ''}
			<div class="alert alert-danger mt-2" role="alert">
				{notification}
			</div>
		{/if}

		<div />
		<button class="w-100 btn btn-lg btn-primary mt-5" type="button" on:click={onLogin}
			>Sign in</button
		>
	</form>
{/if}
