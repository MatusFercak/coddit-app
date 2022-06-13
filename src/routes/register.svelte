<script>
	import { goto } from '$app/navigation';
	import { AppwriteService } from '$lib/appwrite';
	import { onMount } from 'svelte';

	let nickName = '';
	let email = '';
	let password = '';

	onMount(async () => {
		let account = await AppwriteService.getAccount();
		if (account.email != '') {
			goto('/user');
		}
	});

	function onRegister() {
		let promise = AppwriteService.register(email, password, nickName);

		promise.then(
			function (response) {
				console.log(response); // Success
				goto('/user');
			},
			function (error) {
				console.log(error); // Failure
			}
		);
	}
</script>

<form class="pt-5">
	<img class="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
	<h1 class="h3 mb-3 fw-normal">Please register</h1>
	<div class="form-floating mt-2">
		<input
			bind:value={nickName}
			type="email"
			class="form-control"
			id="floatingInput"
			placeholder="name@example.com"
		/>
		<label for="floatingInput">Nick name</label>
	</div>
	<div class="form-floating mt-2">
		<input
			bind:value={email}
			type="email"
			class="form-control"
			id="floatingInput"
			placeholder="name@example.com"
		/>
		<label for="floatingInput">Email address</label>
	</div>
	<div class="form-floating mt-2">
		<input
			bind:value={password}
			type="password"
			class="form-control"
			id="floatingPassword"
			placeholder="Password"
		/>
		<label for="floatingPassword">Password</label>
	</div>
	<div />
	<button on:click={onRegister} class="w-100 btn btn-lg btn-primary mt-5" type="button"
		>Sign in</button
	>
</form>
