import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from "@/context/theme-context";

interface IOption {
	label: string
	action: () => void
}

interface IProps {
	options: IOption[]
}

export function EllipsisMenu(props: IProps) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { theme } = useTheme()

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				aria-controls={open ? 'more-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				className="!p-0"
			>
				<MoreVertIcon
					sx={{ color: theme === 'light' ? 'black' : 'white' }}
				/>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						style: {
							width: '20ch',
						},
					},
					list: {
						'aria-labelledby': 'more-menu-button',
					},
				}}
			>
				{props.options.map((option) => (
					<MenuItem key={option.label} onClick={handleClose}>
						<button onClick={option.action} className="text-sm w-full text-left cursor-pointer">{option.label}</button>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
