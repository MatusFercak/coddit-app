<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppwriteService, user } from '$lib/appwrite';
	import { onMount } from 'svelte';
    let loaded:Boolean= false;
    onMount(async () => {
        await AppwriteService.getAccount();
        loaded = true;
    });

    
	
</script>
<header class="bg-dark shadow-sm">
<div class="py-3 navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <a href="/" class="navbar-brand d-flex align-items-center">
        <strong>Coddit</strong>
      </a>
      {#if loaded}
      {#if $user == null}
        <div>
          <a href="/login"><button type="button" class="btn btn-outline-light me-2">Login</button></a>
	      <a href="/register"><button type="button" class="btn btn-warning">Sign-up</button></a>
        </div>	
      {:else}
        <a href="/user"><button type="button" class="btn btn-outline-light me-2">User</button></a>
      {/if}
      {/if}
    </div>
</div>
</header>

<div class="container">
	<slot />
    <div class="mt-2 d-flex justify-content-center">
        <p class="mt-1 mb-3 text-muted justify-content-center">©Coddit 2022–2023</p>
    </div>
	
</div>
