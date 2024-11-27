"use client";

import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {Toggle} from "@/components/toggle";
import {P} from "@/components/typography";
import {useToast} from "@/hooks/useToast";
import {userSchema} from "@/schema/userSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function CreateUser() {
	const toast = useToast();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: {errors, isSubmitting},
		setValue,
		watch,
	} = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: "",
			email: "",
			role: "",
			status: "Active",
		},
	});

	const submitHandler = async (values: z.infer<typeof userSchema>) => {
		try {
			const response = await fetch("http://localhost:3005/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...values,
					id: Date.now().toString(),
					status: "Active",
				}),
			});

			console.log(response);

			if (response.ok) {
				toast?.add({
					title: "success",
					description: "user created succesfull",
					duration: 200000000,
					variant: "success",
				});
			}

			router.push("/users");
		} catch (error) {
			console.log(error);
			toast?.add({
				title: "Error",
				description: "Failed to update user. Please try again.",
				duration: 3000,
				variant: "error",
			});
		}
	};

	const status = watch("status", "Active"); // Default to "Active"

	const handleCheckboxChange = () => {
		const newStatus = status === "Active" ? "Inactive" : "Active";
		setValue("status", newStatus, {shouldDirty: true, shouldTouch: true});
	};

	return (
		<div className="w-full h-auto bg-gray-50 dark:bg-gray-900 rounded-md shadow-md p-8 space-y-4 ">
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
						placeholder="User name"
						type="text"
						className={`${
							errors.name &&
							"border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
						}`}
					/>
					{errors.name && (
						<P className="text-destructive text-sm">{errors.name.message}</P>
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
						placeholder="User email"
						className={`${
							errors.email &&
							"border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
						}`}
					/>
					{errors.email && (
						<P className="text-destructive text-sm">{errors.email.message}</P>
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
						className={`flex h-10 w-full rounded-md border bg-background bg-gray-800 px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
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
						<P className="text-destructive text-sm">{errors.role.message}</P>
					)}
				</div>

				<div className="flex flex-col space-y-2">
					<Label
						htmlFor="role"
						className={`${errors.role && "text-destructive"}`}>
						Status
					</Label>
					<div className="flex space-x-3 items-center">
						<p className="font-semibold text-red-500">Inactive</p>
						<Toggle
							checked={status === "Active"} // Dynamically update based on the 'status' field
							onChange={handleCheckboxChange}
						/>
						<p className="font-semibold text-emerald-500">Active</p>
					</div>
				</div>

				<Button
					type="submit"
					loading={isSubmitting}
					className="bg-purple-500 hover:bg-purple-400">
					Submit
				</Button>
			</form>
		</div>
	);
}
