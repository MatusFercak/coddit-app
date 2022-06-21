<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppwriteService, user, type Post, type Subcoddit } from '$lib/appwrite';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let subcodditsArray: Subcoddit[] = [];
	let postsArray: Post[] = [];

	function onCreate() {
		goto('/createSub');
	}

	function onClick(id: string) {
		goto('/c/' + id);
		return null;
	}

	function getImg(imgId: string) {
		const url = AppwriteService.getSubcodditImg(imgId);
		return url.toString();
	}

	onMount(async () => {
		let subcoddits = await AppwriteService.getSubcoddits();
		let posts = await AppwriteService.getPostsAll();
		if (subcoddits) {
			console.log(subcoddits.documents);
			subcodditsArray = subcoddits.documents;
			postsArray = posts.documents;

			subcodditsArray = subcodditsArray;
			postsArray = postsArray;
		}
	});
</script>

<div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
	{#each subcodditsArray as c (c.$id)}
		<div
			style="cursor: pointer;"
			class="col hover-zoom"
			data-toggle="popover"
			on:click={onClick(c.$id)}
		>
			<div
				class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg"
				style={`background-image: url('${getImg(
					c.imgId
				)}'); background-position: center; background-size: cover; position: relative;`}
			>
				<div
					style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); z-index: 5;"
				/>
				<div
					class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1"
					style="positon: relative; z-index: 10;"
				>
					<h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{c.name}</h2>
					<ul class="d-flex list-unstyled mt-auto">
						<li class="d-flex align-items-center me-3">
							<small>{c.description}</small>
						</li>
					</ul>
				</div>
			</div>
		</div>
	{/each}
</div>

{#if $user !== null}
	<div class="mt-5 d-flex justify-content-center">
		<button type="button" class="btn btn-primary btn-lg btn-block" on:click={onCreate}
			>Add subcoddit</button
		>
	</div>
{/if}
