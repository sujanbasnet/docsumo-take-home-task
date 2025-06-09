import { useEffect, useState } from "react";

export function useTheme() {
	const [theme, setTheme] = useState<'light' | 'dark'>('dark')

	useEffect(() => {
		// use system preference for theme
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme('dark')
		} else {
			setTheme('light')
		}

		// add event listener for system theme and write a clean up function removing the event listener
		const handleThemeChange = () => {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				setTheme('dark')
			} else {
				setTheme('light')
			}
		}

		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", handleThemeChange);

		return () => {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.removeEventListener("change", handleThemeChange);
		};
	}, [])

	useEffect(() => {
		if (theme === 'dark') {
			// On page load or when changing themes, best to add inline in `head` to avoid FOUC
			document.documentElement.classList.add(
				"dark",
			);
		} else {
			document.documentElement.classList.remove(
				"dark",
			);

		}
	}, [theme])

	return [theme, setTheme]
}
