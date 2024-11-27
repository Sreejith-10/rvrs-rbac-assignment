import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

export const ThemeToggle = () => {
	const {theme, setTheme} = useTheme();

	return (
		<div className="cursor-pointer">
			{theme === "light" ? (
				<Moon onClick={() => setTheme("dark")} />
			) : (
				<Sun onClick={() => setTheme("light")} />
			)}
		</div>
	);
};
