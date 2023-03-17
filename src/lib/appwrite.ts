import { goto } from '$app/navigation';
import { Account, Client, Databases, ID, Query, Storage, type Models } from 'appwrite';
import { writable } from 'svelte/store';

export const user: any = writable(null);

const client = new Client();

client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('coddit');

export type Profile = {
	nickName: string;
} & Models.Document;

export type Comment = {
	userName: string;
	content: string;
	userId: string;
	postId: string;
} & Models.Document;

export type Coddit = {
	description: string;
	name: string;
	imgId: string;
	rules: string;
} & Models.Document;

export type Post = {
	title: string;
	content: string;
	coddit: string;
	imgId: string;
	profileId: string;
	profileName: string;
} & Models.Document;

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const AppwriteService = {
	register: async (email: string, password: string, nickName: string) => {
		const user = await account.create(ID.unique(), email, password);
		const session = await account.createEmailSession(email, password);
		const profile = await databases.createDocument<Profile>(
			'default',
			'profiles',
			user.$id,
			{
				nickName: nickName
			}
		);
	},
	login: async (email: string, password: string) => {
		return await account.createEmailSession(email, password);
	},
	getAccount: async () => {
		try {
			const currentUser = await account.get();
			user.set(currentUser);
			return currentUser.$id;
		} catch (error) {
			user.set(null);
			return null;
		}
	},
	getAccountPro: async () => {
		try {
			const currentUser = await account.get();
			user.set(currentUser);
			return currentUser;
		} catch (error) {
			user.set(null);
			return null;
		}
	},
	addCoddit: async (
		rules: string,
		description: string,
		name: string,
		fileVar: any,
		slug: string
	) => {
		let file: any = await storage.createFile('thumbnails', ID.unique(), fileVar);

		await databases.createDocument<Coddit>(
			'default',
			'coddits',
			slug,
			{
				rules: rules,
				imgId: file.$id,
				description: description,
				name: name
			}
		);
	},
	addPost: async (
		title: string,
		content: string,
		fileVar: any,
		coddit: string,
		profileId: string
	) => {
		let file: any = await storage.createFile('thumbnails', ID.unique(), fileVar);
		let name: any = await databases.getDocument<Profile>('default', 'profiles', profileId);
		await databases.createDocument<Post>(
			'default',
			'posts',
			ID.unique(),
			{
				title: title,
				imgId: file.$id,
				content: content,
				coddit: coddit,
				profileId: name.$id,
				profileName: name.nickName
			}
		);
	},
	addCommnet: async (userName: string, content: string, userId: string, postId: string) => {
		await databases.createDocument<Comment>(
			'default',
			'comments',
			ID.unique(),
			{
				userName: userName,
				content: content,
				userId: userId,
				postId: postId
			}
		);
	},
	getCoddits: async () => {
		try {
			const subcoddits = await databases.listDocuments<Coddit>('default', 'coddits');
			return subcoddits;
		} catch (error) {
			return false;
		}
	},
	getComments: async (postId: string) => {
		return await databases.listDocuments<Comment>('default', 'comments', [
			Query.equal('postId', postId)
		]);
	},
	getPostsAll: async () => {
		return await databases.listDocuments<Post>('default', 'posts');
	},
	getPosts: async (subId: string) => {
		return await databases.listDocuments<Post>('default', 'posts', [Query.equal('coddit', subId)]);
	},
	getPost: async (docId: string) => {
		return await databases.getDocument<Post>('default', 'posts', docId);
	},
	getCoddit: async (docId: string) => {
		return await databases.getDocument<Coddit>('default', 'coddits', docId);
	},
	getProfile: async (profileId: string) => {
		return await databases.getDocument<Profile>('default', 'profiles', profileId);
	},
	getCodditImg: (imgId: string) => {
		return storage.getFilePreview('thumbnails', imgId);
	},
	getPostImg: async (imgId: string) => {
		return await storage.getFilePreview('thumbnails', imgId);
	},
	logOut: async () => {
		await account.deleteSession('current');
		goto('/login');
	},
	deletePost: async (postId: string) => {
		const post = await databases.getDocument<Post>('default', 'posts', postId);
		await storage.deleteFile('thumbnails', post.imgId);
		await databases.deleteDocument('default', 'posts', postId);
	}
};
