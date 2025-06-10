import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeContextProvider } from "@/context/theme-context";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Document previewer",
	description: "Docsumo take home task",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ThemeContextProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col dark:bg-black dark:text-white`}
				>
					<Header />
					<div className="flex-grow">
						{children}
					</div>
				</body>
			</ThemeContextProvider>
		</html>
	);
}
