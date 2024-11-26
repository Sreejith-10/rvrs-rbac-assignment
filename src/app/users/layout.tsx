import {DashboardLayout} from "@/components/dashboard-layout";
import {ReactNode} from "react";

export default function UserLayout({children}: {children: ReactNode}) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
