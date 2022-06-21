<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { AppwriteService } from '$lib/appwrite';

	let subCoddit: string = $page.params.subcoddit;
	let title: string = '';
	let content: string = '';
	let imgId: string = '';
	let fileVar: any;

	async function createPost() {
		const user = await AppwriteService.getAccountPro();
		if (user) {
			const file = await AppwriteService.addPost(title, content, fileVar[0], subCoddit, user?.$id);
			goto('/c/' + subCoddit);
		}
	}
</script>

<div class="mt-2">
	<a href="/c/{subCoddit}"><h2>/c/{subCoddit}</h2></a>
</div>

<div class="mt-3">
	<form class="needs-validation" novalidate>
		<div class="form-row">
			<div class="col-md-6 mb-3">
				<label for="validationCustom03">Title</label>
				<input
					type="text"
					class="form-control"
					id="validationCustom03"
					placeholder="Name"
					required
					bind:value={title}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="validationCustom03">Content</label>
				<input
					type="text"
					class="form-control"
					id="validationCustom03"
					placeholder="Description"
					required
					bind:value={content}
				/>
			</div>

			<div class="col-md-6 mb-3 mt-2">
				<label for="validationCustom03">Cover Photo</label>
				<div class="mt-1">
					<input
						class="form-control form-control-sm"
						id="formFileSm"
						type="file"
						bind:files={fileVar}
					/>
				</div>
			</div>
		</div>
		<button class="btn btn-primary" type="button" on:click={createPost}>Create post</button>
	</form>
</div>
