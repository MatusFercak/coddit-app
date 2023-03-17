<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { AppwriteService, user, type Post, type Coddit } from '$lib/appwrite';
	import { onMount } from 'svelte';

	const subCodId: string = $page.params.subcoddit;

	let posts: Post[] = [];
	let subCoddit: Coddit;
	let urlImg: string;
	let loading: boolean = false;
	let curentUser: any;

	function createPost() {
		goto(subCodId + '/createPost');
	}

	async function getName(profId: string) {
		let profile = await AppwriteService.getProfile(profId);
		console.log(profile.nickName);
		return profile.nick_nickNamename;
	}

	onMount(async () => {
		const document = await AppwriteService.getCoddit(subCodId);
		const img = await AppwriteService.getCodditImg(document.imgId);
		const post = await AppwriteService.getPosts(subCodId);
		const user = await AppwriteService.getAccount();
		curentUser = user;
		posts = post.documents;
		subCoddit = document;
		urlImg = img.toString();
		console.log(document.imgId);
		console.log(urlImg);
		loading = true;
	});
</script>

{#if loading}
	<div class="jumbotron">
		<div class="container">
			<div class="row">
				<div class="d-flex mt-5 justify-content-between align-items-center">
					<h1 class="mx-3">{subCoddit?.name}</h1>

					{#if $user !== null}
						<div>
							<button type="button" class="btn btn-primary" on:click={createPost}>Add post</button>
						</div>
					{/if}
				</div>
				<h3 class="mt-1 mx-3">{subCoddit?.description}</h3>
			</div>
		</div>
	</div>

	<div class="album py-5 bg-light">
		<div class="container">
			<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
				{#each posts as p (p.$id)}
					<div class="col">
						<div class="card shadow-sm">
							<div class="card-body">
								<p class="card-text">{p.title}</p>
								<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
										<a href="/c/{subCodId}/{p.$id}"
											><button type="button" class="btn btn-sm btn-outline-secondary"
												>Read More</button
											></a
										>
									</div>
									<small class="text-muted">@{p.profileName}</small>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
