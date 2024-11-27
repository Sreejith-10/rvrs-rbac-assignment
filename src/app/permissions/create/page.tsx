"use client";

import {Button} from "@/components/button";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {useToast} from "@/hooks/useToast";
import {permissionSchema} from "@/schema/permissionSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";

export default function CreatePermission() {
	const toast = useToast();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: {errors, isSubmitting},
	} = useForm<z.infer<typeof permissionSchema>>({
		resolver: zodResolver(permissionSchema),
		defaultValues: {
			permission: "",
			description: "",
		},
	});

	const submitHandler = async (values: z.infer<typeof permissionSchema>) => {
		try {
			const response = await fetch("http://localhost:3005/permissions", {
				method: "POST",
				headers: {
					"Content-Type": "applications/json",
				},
				body: JSON.stringify({id: Date.now() + "", ...values}),
			});

			if (response.ok)
				toast?.add({
					title: "success",
					description: "Permission created",
				});

			router.push("/permissions");
		} catch (err) {
			console.log(err);
			toast?.add({
				title: "Error",
				description: "Failed to create permission. Please try again.",
				duration: 3000,
				variant: "error",
			});
		}
	};

	return (
		<div className="w-full h-auto bg-gray-50 dark:bg-gray-900 rounded-md shadow-md p-8 space-y-4">
			<h1 className="font-semibold text-3xl">Create new Permission</h1>
			<form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
				<div className="space-y-2">
					<Label
						htmlFor="name"
						className={`${errors.permission && "text-destructive"}`}>
						Permission
					</Label>
					<Input
						{...register("permission")}
						type="text"
						className={`${
							errors.permission &&
							"border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
						}`}
					/>
					{errors.permission && (
						<p className="text-destructive text-sm">
							{errors.permission.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="email"
						className={`${errors.description && "text-destructive"}`}>
						Desciption
					</Label>
					<Input
						{...register("description")}
						type="text"
						className={`${
							errors.description &&
							"border-destructive ring-offset-destructive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive focus-visible:ring-offset-1"
						}`}
					/>
					{errors.description && (
						<p className="text-destructive text-sm">
							{errors.description.message}
						</p>
					)}
				</div>

				<Button className="bg-purple-600 text-gray-50" type="submit" loading={isSubmitting}>
					Submit
				</Button>
			</form>
		</div>
	);
}
