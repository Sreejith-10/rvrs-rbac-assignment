"use client";

import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {Loader} from "@/components/loader";
import {Toggle} from "@/components/toggle";
import {useFetch} from "@/hooks/useFetch";
import {useToast} from "@/hooks/useToast";
import {userSchema} from "@/schema/userSchema";
import {RolesType, UsersType} from "@/types/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useParams, useRouter} from "next/navigation";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function UpdateUser() {
	const {id}: {id: string} = useParams();
	const toast = useToast();
	const router = useRouter();

	const {data: user, isLoading} = useFetch<UsersType>(
		`http://localhost:3005/users/${id}`
	);
	const {data: roles, isLoading: rolesLoading} = useFetch<RolesType[]>(
		`http://localhost:3005/roles`
	);

	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		reset,
		watch,
		formState: {errors, isSubmitting},
	} = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: "",
			email: "",
			role: "",
			status: "Active",
		},
	});

	useEffect(() => {
		if (user) {
			reset({
				name: user.name,
				email: user.email,
				role: user.role,
				status: user.status,
			});
		}
	}, [user, reset]);

	const status = watch("status");

	const handleCheckboxChange = () => {
		const newStatus = status === "Active" ? "Inactive" : "Active";
		setValue("status", newStatus, {shouldDirty: true, shouldTouch: true});
	};

	const submitHandler = async (values: z.infer<typeof userSchema>) => {
		try {
			const response = await fetch(`http://localhost:3005/users/${user?.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (response.ok) {
				toast?.add({
					title: "Success",
					description: "User updated successfully.",
					duration: 3000,
					variant: "success",
				});
				router.push("/users");
			} else {
				throw new Error("Failed to update user");
			}
		} catch (error) {
			console.error(error);
			toast?.add({
				title: "Error",
				description: "Failed to update user. Please try again.",
				duration: 3000,
				variant: "error",
			});
		}
	};

	return (
		<div className="w-full h-auto bg-gray-50 bg-gray-900 rounded-md shadow-md p-8 space-y-4">
			<h1 className="font-semibold text-3xl">Update user</h1>
			{isLoading ? (
				<Loader />
			) : (
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
						{rolesLoading ? (
							<div>Loading roles...</div>
						) : (
							<select
								{...register("role")}
								defaultValue={getValues("role")}
								className={`flex h-10 w-full rounded-md border bg-background dark:bg-gray-800 px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
									errors.role
										? "border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
										: "border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
								}`}>
								<option value="" disabled hidden>
									Select a role
								</option>
								{roles?.map((role, index) => (
									<option key={index} value={role.role}>
										{role.role}
									</option>
								))}
							</select>
						)}
						{errors.role && (
							<p className="text-destructive text-sm">{errors.role.message}</p>
						)}
					</div>

					<div className="flex flex-col space-y-2">
						<Label
							htmlFor="status"
							className={`${errors.status && "text-destructive"}`}>
							Status
						</Label>
						<div className="flex space-x-3 items-center">
							<p className="font-semibold text-red-500">Inactive</p>
							<Toggle
								checked={status === "Active"}
								onChange={handleCheckboxChange}
							/>
							<p className="font-semibold text-emerald-500">Active</p>
						</div>
					</div>

					<Button className="bg-purple-600 text-white" type="submit" loading={isSubmitting}>
						Update
					</Button>
				</form>
			)}
		</div>
	);
}
