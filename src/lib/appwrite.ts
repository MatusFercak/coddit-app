import { goto } from '$app/navigation';
import { Appwrite, type Models } from 'appwrite';
import { current_component } from 'svelte/internal';
const sdk = new Appwrite();

sdk
	.setEndpoint('https://appwrite.matejbaco.eu/v1') // Your Appwrite Endpoint
	.setProject('coddit'); // Your project ID

export type Profile = {
	nick_name: string;
} & Models.Document;

export const AppwriteService = {
	register: async (email: string, password: string, nickName: string) => {
		const user = await sdk.account.create('unique()', email, password);
		const session = await sdk.account.createSession(email, password);
		const profile = await sdk.database.createDocument('profiles', user.$id, {
			nick_name: nickName
		});
	},
	login: async (email: string, password: string) => {
		return await sdk.account.createSession(email, password);
	},
	getAccount: async () => {
		return await sdk.account.get();
	},
	getProfile: async (profileId: string) => {
		console.log(profileId);
		return await sdk.database.getDocument<Profile>('profiles', profileId);
	},
	logOut: async () => {
		await sdk.account.deleteSession('current');
		goto('/login');
	}
};
