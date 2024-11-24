"use client";

import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {useToast} from "@/hooks/useToast";
import {userSchema} from "@/schema/userSchema";
import {useUsersStore} from "@/store/useUsersStore";
import {Roles} from "@/types/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function CreateUser() {
	const createUser = useUsersStore((state) => state.createUser);
	const toast = useToast();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: {errors, isSubmitting},
	} = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: "",
			email: "",
			role: "",
		},
	});

	const submitHandler = (values: z.infer<typeof userSchema>) => {
		createUser({
			name: values.name,
			email: values.email,
			role: values.role as Roles,
		});

		toast?.add({
			title: "success",
			description: "User created",
			duration: 3000,
			variant: "success",
		});

		router.push("/users");
	};

	return (
		<div className="w-full h-auto bg-white rounded-md shadow-md p-8 space-y-4">
			<h1 className="font-semibold text-3xl">Create new user</h1>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
				<div className="space-y-2">
					<Label
						htmlFor="name"
						className={`${errors.name && "text-destructive"}`}>
						Name
					</Label>
					<Input
						{...register("name")}
						type="text"
						className={`${
							errors.name &&
							"border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
						}`}
					/>
					{errors.name && (
						<p className="text-destructive text-sm">{errors.name.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="email"
						className={`${errors.email && "text-destructive"}`}>
						Email
					</Label>
					<Input
						{...register("email")}
						type="text"
						className={`${
							errors.email &&
							"border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
						}`}
					/>
					{errors.email && (
						<p className="text-destructive text-sm">{errors.email.message}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="role"
						className={`${errors.role && "text-destructive"}`}>
						Role
					</Label>
					<select
						defaultValue="Select a role"
						{...register("role")}
						className={`flex h-10 w-full rounded-md border  bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
							errors.role
								? "border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
								: "border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
						}`}>
						<option value="Select a role" disabled hidden>
							Select a role
						</option>
						<option value="Admin">Admin</option>
						<option value="Editor">Editor</option>
						<option value="Viewer">Viewer</option>
					</select>
					{errors.role && (
						<p className="text-destructive text-sm">{errors.role.message}</p>
					)}
				</div>

				<Button type="submit" loading={isSubmitting}>
					Submit
				</Button>
			</form>
		</div>
	);
}
