import {DashboardLayout} from "@/components/dashboard-layout";
import {Activity, Key, Shield, UserPlus, Users} from "lucide-react";

export default function Home() {
	return (
		<DashboardLayout>
			<div className="w-full space-y-6">
				<h1 className="font-semibold text-4xl">Dashboard</h1>
				<div className="flex flex-wrap gap-8">
					<div className="md:w-[350px] w-full bg-white dark:bg-gray-800 px-10 py-9 rounded-md shadow-md space-y-6">
						<div className="flex justify-between items-center">
							<h1 className="font-semibold text-lg">Total Users</h1>
							<Users className="text-purple-500" />
						</div>
						<div>
							<h2 className="font-semibold text-4xl text-purple-500">1,234</h2>
							<p className="text-slate-500">+20% from last month</p>
						</div>
					</div>
					<div className="md:w-[350px] w-full bg-white dark:bg-gray-800 px-10 py-9 rounded-md shadow-md space-y-6">
						<div className="flex justify-between items-center">
							<h1 className="font-semibold text-lg">Active Users</h1>
							<Activity className="text-purple-500" />
						</div>
						<div>
							<h2 className="font-semibold text-4xl text-purple-500">1,24</h2>
							<p className="text-slate-500">+5% from last month</p>
						</div>
					</div>
					<div className="md:w-[350px] w-full bg-white dark:bg-gray-800 px-10 py-9 rounded-md shadow-md space-y-6">
						<div className="flex justify-between items-center">
							<h1 className="font-semibold text-lg">Total Roles</h1>
							<UserPlus className="text-purple-500" />
						</div>
						<div>
							<h2 className="font-semibold text-4xl text-purple-500">13</h2>
							<p className="text-slate-500">+2 new roles added</p>
						</div>
					</div>{" "}
					<div className="md:w-[350px] w-full bg-white dark:bg-gray-800 px-10 py-9 rounded-md shadow-md space-y-6">
						<div className="flex justify-between items-center">
							<h1 className="font-semibold text-lg">Permissions</h1>
							<Key className="text-purple-500" />
						</div>
						<div>
							<h2 className="font-semibold text-4xl text-purple-500">48</h2>
							<p className="text-slate-500">+2 from last week</p>
						</div>
					</div>
					<div className="md:w-[350px] w-full bg-white dark:bg-gray-800 px-10 py-9 rounded-md shadow-md space-y-6">
						<div className="flex justify-between items-center">
							<h1 className="font-semibold text-lg">Security Score</h1>
							<Shield className="text-purple-500" />
						</div>
						<div>
							<h2 className="font-semibold text-4xl text-purple-500">89%</h2>
							<p className="text-slate-500">+18% from last audit</p>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
