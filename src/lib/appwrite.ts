import { goto } from '$app/navigation';
import { Appwrite, Query, type Models } from 'appwrite';
import { current_component } from 'svelte/internal';
import { writable } from 'svelte/store';

export const user: any = writable(null);
const sdk = new Appwrite();

sdk
	.setEndpoint('https://appwrite.matejbaco.eu/v1') // Your Appwrite Endpoint
	.setProject('coddit'); // Your project ID

export type Profile = {
	nick_name: string;
} & Models.Document;

export type Subcoddit = {
	description: string;
	name: string;
	imgId: string;
} & Models.Document;

export type Post = {
	title: string;
	content: string;
	subcoddit: string;
	imgId: string;
	profileid: string;
	profileName: string;
} & Models.Document;

export type Comment = {
	userName: string;
	createdate: Date;
	content: string;
	userId: string;
	postId: string;
} & Models.Document;

export const AppwriteService = {
	register: async (email: string, password: string, nickName: string) => {
		const user = await sdk.account.create('unique()', email, password);
		const session = await sdk.account.createSession(email, password);
		const profile = await sdk.database.createDocument(
			'profiles',
			user.$id,
			{
				nick_name: nickName
			},
			['role:all']
		);
	},
	login: async (email: string, password: string) => {
		return await sdk.account.createSession(email, password);
	},
	getAccount: async () => {
		try {
			const currentUser = await sdk.account.get();
			console.log('USER : ' + currentUser.$id);
			user.set(currentUser);
			return currentUser.$id;
		} catch (error) {
			user.set(null);
			return null;
		}
	},
	getAccountPro: async () => {
		try {
			const currentUser = await sdk.account.get<Profile>();
			console.log('USER : ' + currentUser.$id);
			user.set(currentUser);
			return currentUser;
		} catch (error) {
			user.set(null);
			return null;
		}
	},
	addSubcoddit: async (
		rules: string,
		description: string,
		name: string,
		fileVar: any,
		slug: string
	) => {
		let file: any = await sdk.storage.createFile('coddit-imgs', 'unique()', fileVar, ['role:all']);

		const subcoddit = await sdk.database.createDocument(
			'subcoddit',
			slug,
			{
				rules: rules,
				imgId: file.$id,
				description: description,
				createDate: Date.now(),
				name: name
			},
			['role:all']
		);
	},
	addPost: async (
		title: string,
		content: string,
		fileVar: any,
		subCodit: string,
		profileId: string
	) => {
		let file: any = await sdk.storage.createFile('post-imgs', 'unique()', fileVar, ['role:all']);
		let name: any = await sdk.database.getDocument<Profile>('profiles', profileId);
		const subcoddit = await sdk.database.createDocument(
			'subpost',
			'unique()',
			{
				title: title,
				imgId: file.$id,
				content: content,
				createDate: Date.now(),
				subcoddit: subCodit,
				profileid: name.$id,
				profileName: name.nick_name
			},
			['role:all']
		);
	},
	addCommnet: async (userName: string, content: string, userId: string, postId: string) => {
		const comment = await sdk.database.createDocument(
			'subpost-comment',
			'unique()',
			{
				userName: userName,
				createdate: Date.now(),
				content: content,
				userId: userId,
				postId: postId
			},
			['role:all']
		);
	},
	getSubcoddits: async () => {
		try {
			const subcoddits = await sdk.database.listDocuments<Subcoddit>('subcoddit');
			return subcoddits;
		} catch (error) {
			return false;
		}
	},
	getComments: async (postId: string) => {
		return await sdk.database.listDocuments<Comment>('subpost-comment', [
			Query.equal('postId', postId)
		]);
	},
	getPostsAll: async () => {
		return await sdk.database.listDocuments<Post>('subpost');
	},
	getPosts: async (subId: string) => {
		return await sdk.database.listDocuments<Post>('subpost', [Query.equal('subcoddit', subId)]);
	},
	getPost: async (docId: string) => {
		return await sdk.database.getDocument<Post>('subpost', docId);
	},
	getSubcoddit: async (docId: string) => {
		return await sdk.database.getDocument<Subcoddit>('subcoddit', docId);
	},
	getProfile: async (profileId: string) => {
		return await sdk.database.getDocument<Profile>('profiles', profileId);
	},
	getSubcodditImg: (imgId: string) => {
		return sdk.storage.getFilePreview('coddit-imgs', imgId);
	},
	getPostImg: async (imgId: string) => {
		return await sdk.storage.getFilePreview('post-imgs', imgId);
	},
	logOut: async () => {
		await sdk.account.deleteSession('current');
		goto('/login');
	},
	deletePost: async (postId: string) => {
		const post = await sdk.database.getDocument<Post>('subpost', postId);
		await sdk.storage.deleteFile('post-imgs', post.imgId);
		await sdk.database.deleteDocument('subpost', postId);
	}
};
