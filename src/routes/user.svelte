<script>
	import { goto } from '$app/navigation';

	import { AppwriteService } from '$lib/appwrite';
	import { onMount } from 'svelte';

	let email = '';
	let nickName = '';

	onMount(async () => {
		let account = await AppwriteService.getAccount();
		let profile = await AppwriteService.getProfile(account.$id);

		email = account.email;
		nickName = profile.nick_name;
	});

	function onLogOut() {
		AppwriteService.logOut();
		goto('/login');
	}
</script>

<p>{email}</p>
<p>{nickName}</p>
<button class="w-100 btn btn-lg btn-primary mt-5" type="button" on:click={onLogOut}>Log out.</button
>
