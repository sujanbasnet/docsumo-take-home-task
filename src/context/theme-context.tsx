"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface IThemeContext {
	theme: 'light' | 'dark'
	setTheme: Dispatch<SetStateAction<IThemeContext['theme']>>
}

const ThemeContext = createContext<IThemeContext | null>(null)

export function ThemeContextProvider({ children }: { children: ReactNode }) {
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


	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)

	if (context === null) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}

	return context
}
