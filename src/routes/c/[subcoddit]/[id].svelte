<script lang="ts">
import { goto } from "$app/navigation";

    import { page } from "$app/stores";
    import { AppwriteService, type Post, type Profile, type Comment } from "$lib/appwrite";
    import { Appwrite } from "appwrite";
    import { onMount } from "svelte";   

    let comments:Comment[]=[];

    let codId = $page.params.id;
    let actualDocument:Post; 
    let postOwner:Profile;
    let urlImg:string;
    let curentUserId:string;
    let curentUserName:string;

    let content:string = '';
    
    async function addCommnent(){
        await AppwriteService.addCommnet(curentUserName,content,curentUserId,codId)
        const com = await AppwriteService.getComments(codId);
        comments = com.documents;
        content = '';
    }

    async function deletePost(){
        await AppwriteService.deletePost(actualDocument.$id);
        goto("/c/"+$page.params.subcoddit)
        return null
    }


    onMount(async ()=>{
        const com = await AppwriteService.getComments(codId);
        const document = await AppwriteService.getPost(codId);
        const img = await AppwriteService.getPostImg(document.imgId);
        const user = await AppwriteService.getProfile(document.profileid);
        const userC = await AppwriteService.getAccountPro();
        if (userC) {
            const userComment = await AppwriteService.getProfile(userC.$id)
            curentUserId = userComment.$id
            curentUserName = userComment.nick_name
            console.log("NAME : "+curentUserName+" ID : "+curentUserId);
        }
        comments = com.documents
        postOwner = user;
        actualDocument = document;
        urlImg = img.toString();
    });

</script>
<!-- <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark"> -->
    
{#if actualDocument}
<div class="d-flex mt-5 justify-content-between text-white rounded-3 bg-dark" style={`background-image: url('${urlImg}');`}>
    <div class="d-flex flex-row align-items-center text-white">
        <div class="text-white">
            <a href="/c/{$page.params.subcoddit}" class="btn btn-secondary mx-5 mt-5"><h3>c/{$page.params.subcoddit}</h3> </a>
            <h1 class="mt-2 mx-5 px-2 rounded bg-dark">{actualDocument.title}</h1>
            <h4 class="mt-2 mx-5 px-2 rounded bg-dark">{actualDocument.content}</h4>
            <p class="mt-2 mx-5 px-2 rounded bg-dark">@{postOwner.nick_name}</p>
        </div>
    </div>
</div>
<div class="my-3 p-3 bg-body rounded shadow-sm">
    <h6 class="border-bottom pb-2 mb-0">Comments</h6>
    {#each comments as com (com.$id)}
        <div class="d-flex text-muted pt-3">
        <p class="pb-3 mb-0 small lh-sm border-bottom">
            <strong class="d-block text-gray-dark">@{com.userName}</strong>
            <strong class="d-block text-gray-dark">{new Date(com.createdate).toLocaleString()}</strong>
            {com.content}
        </p>
        </div>
    {/each}
    {#if curentUserId}
    <div class="mt-4 d-flex justify-content-center">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" type="button" on:click="{addCommnent}">Add comment</button>
            </div>
            <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" bind:value="{content}">
        </div>
    </div>
    {/if}
  </div>
{#if curentUserId == postOwner.$id}
    <div class="mt-2 d-flex justify-content-center">
        <button type="button" class="btn btn-warning mt-2" on:click="{deletePost}">Delete post!</button>
    </div>
{/if}
{/if}

