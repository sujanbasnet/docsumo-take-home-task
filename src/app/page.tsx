"use client"

import { Sidebar } from "@/components/sidebar";
import { FieldsList } from "@/feature/fields-list";
import { Previewer } from "@/feature/previewer";
import { useCallback, useState } from "react";
import Sections from '@/data/sections.json'
import { PreviewerContextProvider } from "@/context/previewer-context";
import { Tab, Tabs, } from "@mui/material";
import { Button } from "@/components/button";

export default function Root() {
	const [fields, setFields] = useState(Sections.data.sections[0].children.map(child => ({
		...child,
		isChecked: false
	})))

	const removeField = useCallback((id: number) => {
		setFields(fields => {
			return fields.filter(field => field.id !== id)
		});
	}, [])

	const selectField = useCallback((id: number) => {
		setFields(fields => {
			return fields.map(field => {
				if (field.id === id) {
					return {
						...field,
						isChecked: true
					}
				}

				return { ...field }
			})
		})
	}, [])

	const deselectField = useCallback((id: number) => {
		setFields(fields => {
			return fields.map(field => {
				if (field.id === id) {
					return {
						...field,
						isChecked: false,
					}
				}

				return { ...field }
			})
		})
	}, [])

	function selectAllFields() {
		setFields(fields => {
			return fields.map(field => {
				return {
					...field,
					isChecked: true
				}
			})
		})
	}

	return (
		<PreviewerContextProvider>
			<main className="grid grid-cols-[1fr_400px] gap-4 h-full">
				<div className="p-2 bg-gray-50 dark:bg-[#526069]">
					<Previewer fields={fields} />
				</div>
				<Sidebar>
					<div className="flex flex-col justify-between">
						<div className="p-2 flex-grow">
							<p>Fields</p>
							<Tabs value={0}>
								<Tab label="Regular Fields" />
							</Tabs>
							<TabPanel value={0} index={0}>
								<FieldsList fields={fields} removeField={removeField} selectField={selectField} deselectField={deselectField} />
							</TabPanel>
						</div>
						<div className="flex justify-between sticky">
							<Button className="bg-gray-100 dark:bg-gray" onClick={selectAllFields}>Select all</Button>
							<Button className="bg-gray-100 dark:bg-gray">Confirm</Button>
						</div>
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
