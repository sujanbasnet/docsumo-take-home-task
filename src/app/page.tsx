"use client"

import { Sidebar } from "@/components/sidebar";
import { FieldsList } from "@/feature/fields-list";
import { Previewer } from "@/feature/previewer";
import { useCallback, useState } from "react";
import Sections from '@/data/sections.json'
import { PreviewerContextProvider } from "@/context/previewer-context";
import { Tab, Tabs, } from "@mui/material";

export default function Root() {
	const [fields, setFields] = useState(Sections.data.sections[0].children)

	const removeField = useCallback((id: number) => {
		setFields(fields => {
			return fields.filter(field => field.id !== id)
		});
	}, [])

	return (
		<PreviewerContextProvider>
			<main className="grid grid-cols-[1fr_400px] gap-4 h-full">
				<div className="p-2 bg-gray-50 dark:bg-[#526069]">
					<Previewer fields={fields} />
				</div>
				<Sidebar>
					<div className="p-2">
						<p>Fields</p>
						<Tabs value={0}>
							<Tab label="Regular Fields" />
						</Tabs>
						<TabPanel value={0} index={0}>
							<FieldsList fields={fields} removeField={removeField} />
						</TabPanel>
					</div>
				</Sidebar>
			</main >
		</PreviewerContextProvider >
	)
}

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<>{children}</>
			)}
		</div>
	);
}
