import {DashboardLayout} from "@/components/dashboard-layout";
import {ReactNode} from "react";

export default function PermissionsLayout({children}: {children: ReactNode}) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
