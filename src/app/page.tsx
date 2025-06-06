"use client"

import { Sidebar } from "@/components/sidebar";
import { FieldsList } from "@/feature/fields-list";
import { Previewer } from "@/feature/previewer";
import { useState } from "react";
import Sections from '@/data/sections.json'
import { PreviewerContextProvider } from "@/context/previewer-context";
import { ImagePreview } from "@/feature/image-preview";

export default function Root() {
	const [fields, setFields] = useState(Sections.data.sections[0].children)

	return (
		<PreviewerContextProvider>
			<main className="grid grid-cols-[1fr_400px] gap-4 h-full">
				<div className="p-2 bg-gray-50">
					<Previewer fields={fields} />
					<ImagePreview imageURL="/document.jpg" />
				</div>
				<Sidebar><FieldsList fields={fields} /></Sidebar>
			</main>
		</PreviewerContextProvider>
	)
}
