"use client";

import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {useFetch} from "@/hooks/useFetch";
import {useToast} from "@/hooks/useToast";
import {roleSchema} from "@/schema/roleSchema";
import {PermissionsType} from "@/types/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function CreateRole() {
	const toast = useToast();
	const router = useRouter();

	const {data} = useFetch<PermissionsType[]>(
		"http://localhost:3005/permissions"
	);

	console.log(data);

	const {
		register,
		handleSubmit,
		formState: {errors, isSubmitting},
		getValues,
		setValue,
	} = useForm<z.infer<typeof roleSchema>>({
		resolver: zodResolver(roleSchema),
		defaultValues: {
			role: "",
			permissions: [],
		},
	});

	const submitHandler = async (values: z.infer<typeof roleSchema>) => {
		try {
			const response = await fetch("http://localhost:3005/roles", {
				method: "POST",
				headers: {
					"Content-Type": "applications/json",
				},
				body: JSON.stringify({id: Date.now() + "", ...values}),
			});

			if (response.ok)
				toast?.add({
					title: "Success",
					description: "Role created",
				});

			router.push("/roles");
		} catch (error) {
			console.log(error);
			toast?.add({
				title: "Error",
				description: "Failed to create role. Please try again.",
				duration: 3000,
				variant: "error",
			});
		}
	};

	const handleCheckboxChange = (permission: string, isChecked: boolean) => {
		const currentPermissions = getValues("permissions");

		if (isChecked) {
			setValue("permissions", [...currentPermissions, permission]);
		} else {
			setValue(
				"permissions",
				currentPermissions.filter((p) => p !== permission)
			);
		}
	};

	return (
		<div className="w-full h-auto bg-gray-50 dark:bg-gray-900 rounded-md shadow-md p-8 space-y-4">
			<h1 className="font-semibold text-3xl">Create new user</h1>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
				<div className="space-y-2">
					<Label
						htmlFor="name"
						className={`${errors.role && "text-destructive"}`}>
						Role
					</Label>
					<Input
						{...register("role")}
						type="text"
						className={`${
							errors.role &&
							"border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
						}`}
					/>
					{errors.role && (
						<p className="text-destructive text-sm">{errors.role.message}</p>
					)}
				</div>

				<div className="flex flex-col">
					<Label className={`${errors.role && "text-destructive"}`}>
						Permission
					</Label>
					<div className="flex flex-wrap gap-4 items-start justify-start">
						{data?.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-center gap-3">
								<Input
									type="checkbox"
									id={`permission-${index}`}
									onChange={(e) =>
										handleCheckboxChange(item.permission, e.target.checked)
									}
								/>
								<Label htmlFor={`permission-${index}`}>{item.permission}</Label>
							</div>
						))}
					</div>
					{errors.permissions && (
						<p className="text-destructive text-sm">
							{errors.permissions.message}
						</p>
					)}
				</div>

				<Button className="bg-purple-500 text-gray-50" type="submit" loading={isSubmitting}>
					Submit
				</Button>
			</form>
		</div>
	);
}
