"use client"

import { Sidebar } from "@/components/sidebar";
import { FieldsList } from "@/feature/fields-list";
import { Previewer } from "@/feature/previewer";
import { useCallback, useState } from "react";
import Sections from '@/data/sections.json'
import { PreviewerContextProvider } from "@/context/previewer-context";
import { Modal, Tab, Tabs, } from "@mui/material";
import { Button } from "@/components/button";
import colors from '@/data/colors.json'

export default function Root() {
	const [fields, setFields] = useState(Sections.data.sections[0].children.map((child, index) => ({
		...child,
		isChecked: false,
		color: colors[index]?.hex
	})))

	const [modalStatus, setModalStatus] = useState<'confirm' | 'success' | 'closed'>('closed')

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

	const totalSelectedFields = fields.filter(field => field.isChecked).length

	function closeModal() {
		setModalStatus('closed')
	}

	return (
		<PreviewerContextProvider>
			<main className="grid grid-cols-[1fr_400px] gap-4 h-full">
				<div className="p-2 bg-gray-50 dark:bg-[#526069]">
					<Previewer fields={fields} />
				</div>
				<Sidebar>
					<div className="flex flex-col justify-between h-full py-2">
						<div className="p-2 flex-grow">
							<p>Fields</p>
							<Tabs value={0}>
								<Tab label="Regular Fields" />
							</Tabs>
							<TabPanel value={0} index={0}>
								<FieldsList fields={fields} removeField={removeField} selectField={selectField} deselectField={deselectField} />
							</TabPanel>
						</div>
						<div className="flex justify-between sticky border-t py-2">
							<Button className="bg-gray-100 dark:bg-gray-800" onClick={selectAllFields}>Select all</Button>
							<Button className="bg-gray-100 dark:bg-gray-800 disabled:opacity-50" disabled={totalSelectedFields < 2} onClick={() => setModalStatus('confirm')}>Confirm</Button>
						</div>
					</div>
				</Sidebar>
			</main >
			{
				modalStatus === 'confirm' && (
					<Modal open onClose={closeModal}>
						<div className="p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
							<p>Are you sure you want to confirm the selected fields?</p>
							<div className="flex justify-center gap-2 mt-10">
								<Button onClick={() => setModalStatus('success')} className="bg-green-300">Confirm</Button>
								<Button onClick={closeModal} className="bg-red-300">Cancel</Button>
							</div>
						</div>
					</Modal>
				)
			}
			{
				modalStatus === 'success' && (
					<Modal open onClose={closeModal}>
						<div className="p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-green-300">
							<p>Fields confirmed and processed successfully.</p>
							<Button onClick={closeModal} className="bg-gray-100 mt-10 mx-auto block">Close</Button>
						</div>
					</Modal>
				)
			}
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
