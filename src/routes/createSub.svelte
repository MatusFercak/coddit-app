<script lang="ts">
	import { goto } from '$app/navigation';

	import { AppwriteService } from '$lib/appwrite';

	let fileVar: any;
	let name: string;
	let description: string;
	let rules: string;
	let slug: string;

	async function createSub() {
		const file = await AppwriteService.addSubcoddit(rules, description, name, fileVar[0], slug);
		goto('/');
	}
</script>

<div class="mt-5">
	<form class="needs-validation" novalidate>
		<div class="form-row">
			<div class="col-md-6 mb-3">
				<label for="validationCustom03">Name</label>
				<input
					type="text"
					class="form-control"
					id="validationCustom03"
					placeholder="Name"
					required
					bind:value={name}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="validationCustom03">Slug</label>
				<input
					type="text"
					class="form-control"
					id="validationCustom03"
					placeholder="Name"
					required
					bind:value={slug}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="validationCustom03">Description</label>
				<input
					type="text"
					class="form-control"
					id="validationCustom03"
					placeholder="Description"
					required
					bind:value={description}
				/>
			</div>
			<div class="form-group">
				<label for="exampleFormControlTextarea1">Rules</label>
				<textarea
					class="form-control"
					id="exampleFormControlTextarea1"
					rows="3"
					bind:value={rules}
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
		<button class="btn btn-primary" type="button" on:click={createSub}>Create subcoddit</button>
	</form>
</div>
