// @ts-nocheck
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { usePagination, useSortBy, useTable } from 'react-table'
import { ToggleSwitch, IToggleProps } from '@/components'
import { useState } from 'react'
import { Accordion } from '@/components'

interface IProps {
	data: any[]
	columns: any[]
	showFilterButton?: boolean
	className?: string
}

const TableRow = ({ row }) => {
	return (
		<div className="flex flex-col gap-3 rounded-lg bg-green-charleston px-3 pb-2 pt-4">
			{row.cells.map((cell, idx) => {
				return (
					<div key={idx} {...cell.getCellProps()} id={`tmd_${cell.column.id}`} className="flex justify-between">
						<span className="text-sm text-blue-tiffany/80">{cell.render('Header')}</span>
						{cell.render('Cell')}
					</div>
				)
			})}
		</div>
	)
}

const FilterButton = ({ showFilterButton, onChange, label, checked }: { showFilterButton: boolean } & IToggleProps) => {
	if (!showFilterButton) {
		return null
	}

	return (
		<div className="w-full pb-2">
			<ToggleSwitch onChange={onChange} checked={checked} label={label} />
		</div>
	)
}

export const MobileTable: React.FC<IProps> = ({ columns, data, showFilterButton, className }) => {
	const tableInstance = useTable(
		{ columns, data, initialState: { pageIndex: 0, pageSize: 20 } },
		useSortBy,
		usePagination,
	)
	const [filterActive, setFilterActive] = useState(true)

	const {
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		nextPage,
		previousPage,
		state: { pageIndex },
		page,
	} = tableInstance

	return (
		<div className="w-full rounded-xl bg-dark-gunmetal p-4 text-white shadow-[0px_6px_14px_-3px_rgba(0,_0,_0,_0.25)]">
			<div className="px-3">
				<FilterButton
					showFilterButton={showFilterButton}
					onChange={() => setFilterActive(!filterActive)}
					checked={filterActive}
					label="Active only"
				/>
			</div>

			<div className={`flex w-full flex-col gap-4 ${className}`}>
				{page.map((row, idx) => {
					prepareRow(row)
					if (filterActive && Date.now() > row.original.endTime * 1000) {
						return null
					}

					return <TableRow row={row} key={idx} />
				})}
			</div>
			<div className="mt-2 flex items-center justify-center space-x-1 pb-3">
				<button
					className="text-darkOrange disabled:text-dark/20 p-1 dark:disabled:text-white/40"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}>
					<BsArrowLeftShort size={24} />
				</button>

				<span className="text-dark/70 text-sm dark:text-white/70">
					Page {Math.min(pageIndex + 1, pageOptions.length)} of {pageOptions.length}
				</span>
				<button
					className="text-darkOrange disabled:text-dark/20 p-1 dark:disabled:text-white/40"
					onClick={() => nextPage()}
					disabled={!canNextPage}>
					<BsArrowRightShort size={24} />
				</button>
			</div>
		</div>
	)
}
