import {UsersType} from "@/types/types";
import {create} from "zustand";

type UsersStore = {
	users: UsersType[];
	createUser: (user: Omit<UsersType, "uid" | "status">) => void;
	updateUser: (user: UsersType) => void;
	deleteUser: (uid: number) => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
	users: [],
	createUser: (user) => {
		set((state) => ({
			users: [...state.users, {uid: state.users.length + 1,status:"Active", ...user}],
		}));
	},
	updateUser: (user) => {
		set((state) => ({
			users: [
				...state.users.map((item) =>
					item.uid === user.uid ? {...user} : {...item}
				),
			],
		}));
	},
	deleteUser: (uid) => {
		set((state) => ({
			users: [...state.users.filter((item) => item.uid === uid)],
		}));
	},
}));
