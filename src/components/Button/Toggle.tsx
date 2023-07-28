export interface IToggleProps {
	checked?: boolean
	onChange: () => void
	label?: string
}

export const ToggleSwitch: React.FC<IToggleProps> = ({ checked, onChange, label }) => {
	const baseClasses = `mr-3 h-3.5 w-8 appearance-none rounded-[0.4375rem]
	 																										bg-white before:pointer-events-none before:absolute 
	 																										before:h-3.5 before:w-3.5 before:rounded-full 
	 																										before:bg-transparent before:content-[''] after:absolute 
	 																										after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 
	 																										after:rounded-full after:border-none after:bg-neutral-100 
	 																										before:content-[''] after:transition-[background-color_0.2s,transform_0.2s] 
	 																										hover:cursor-pointer`

	const checkedClasses = `checked:bg-blue-tiffany/60 checked:after:absolute checked:after:z-[2] 
																checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 
																checked:after:w-5 checked:after:rounded-full checked:after:border-none 
																checked:after:bg-white checked:after:transition-[background-color_0.2s,transform_0.2s]
																checked:after:content-[''] checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)]`

	const classes = `${baseClasses} ${checkedClasses}`

	return (
		<div className="flex items-center">
			<input
				className={classes}
				type="checkbox"
				role="switch"
				id="toggleSwitch"
				checked={checked}
				onChange={onChange}
			/>
			<label className="inline-block text-sm pl-[0.15rem] hover:cursor-pointer" htmlFor="toggleSwitch">
				{label}
			</label>
		</div>
	)
}

export default ToggleSwitch
