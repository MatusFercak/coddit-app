<script>
	import { goto } from '$app/navigation';

	import { AppwriteService } from '$lib/appwrite';
	import { onMount } from 'svelte';

	let email = '';
	let nickName = '';

    

	onMount(async () => {
		let account = await AppwriteService.getAccountPro();
        if (account) {
            let profile = await AppwriteService.getProfile(account.$id);
            email = account.email;
		    nickName = profile.nick_name;
        }
		
	});

	function onLogOut() {
		AppwriteService.logOut();
		goto('/login');
	}
</script>

<div class="d-flex justify-content-center">
    <h1 class="mt-5">@{nickName}</h1>
</div>
<div class="d-flex justify-content-center">
    <p class="mt-2">{email}</p>
</div>
<div class="d-flex justify-content-center">
    <button class="w-max btn btn-lg btn-primary mt-5" type="button" on:click={onLogOut}>Log out.</button>
</div>

