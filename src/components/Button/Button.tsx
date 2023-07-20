import { ComponentProps } from 'react'

export const Button: React.FC<ComponentProps<'button'> & { format?: string }> = ({
	children,
	className,
	format,
	...props
}) => {
	const classNameString = `${className?.toString()} ${
		format == 'big' ? 'px-6 py-2.5 leading-none rounded-xl' : 'px-2.5 py-1.5 leading-tight rounded-lg'
	}`

	return (
		<button
			className={`${classNameString} text-md leading-tight text-white justify-center items-center gap-1 inline-flex bg-blue-tiffany hover:bg-blue-tiffany/70 disabled:opacity-40 disabled:text-white`}
			{...props}>
			{children}
		</button>
	)
}
