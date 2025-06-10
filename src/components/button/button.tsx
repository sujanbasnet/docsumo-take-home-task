interface IProps extends React.ComponentProps<'button'> {
	children: React.ReactNode
	className?: string
}

export function Button(props: IProps) {
	const { children, className, ...otherProps } = props
	return <button className={`px-3 py-2 rounded-md ${className}`} {...otherProps}>{children}</button>
}
