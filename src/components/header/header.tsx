'use client'

import { useTheme } from "@/hooks/useTheme";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export function Header() {
	const [theme, setTheme] = useTheme()

	function toggleTheme() {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<nav className="px-5 py-5 flex items-center gap-5">
			<h1>Review Screen</h1>
			<IconButton onClick={toggleTheme} color="inherit">
				{theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
			</IconButton>
		</nav>
	)
}
