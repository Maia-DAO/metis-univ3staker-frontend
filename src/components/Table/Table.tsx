// @ts-nocheck
import { IToggleProps, ToggleSwitch } from '@/components'
import { useMemo, useState } from 'react'
import { BsArrowDownShort, BsArrowLeftShort, BsArrowRightShort, BsArrowUpShort } from 'react-icons/bs'
import { usePagination, useSortBy, useTable } from 'react-table'

interface IProps {
	data: any[]
	columns: any[]
	showFilterButton?: boolean
	className?: string
}

const TableHeader = ({ headers, idx }) => {
	return (
		<tr key={idx} {...headers.getHeaderGroupProps()}>
			{headers.headers.map((column, idx) => {
				return <TableColumn key={idx} column={column} currentHeader={column.render('Header')} />
			})}
		</tr>
	)
}

const TableColumn = ({ column, currentHeader }) => {
	return (
		<th
			{...column.getHeaderProps(!column.disabledSorting && column.getSortByToggleProps())}
			id={`th_${column?.id}`}
			className="px-4 py-2">
			<ColumnContent column={column} currentHeader={currentHeader} />
		</th>
	)
}

const ColumnContent = ({ column, currentHeader }) => {
	return (
		<div className={`flex items-center gap-1 ${currentHeader == 'Pool' ? 'justify-start' : 'justify-center'} relative`}>
			<div className={`${currentHeader == 'Pool' ? '' : 'block w-full'}`}>
				<span
					className={`flex justify-center font-normal ${
						column.isSorted ? 'text-blue-tiffany' : 'text-blue-tiffany/60 hover:text-blue-tiffany/80'
					}`}>
					<span className="relative">
						{currentHeader}
						<span
							className={`absolute -right-1 top-1/2 -translate-y-1/2 duration-200 ${
								column.isSorted
									? 'pointer-events-auto translate-x-5 opacity-100'
									: 'pointer-events-none translate-x-0 opacity-0'
							}`}>
							{column.isSortedDesc ? <BsArrowDownShort size={22} /> : <BsArrowUpShort size={22} />}
						</span>
					</span>
				</span>
			</div>
		</div>
	)
}

const TableRow = ({ row }) => {
	return (
		<tr {...row.getRowProps()} className="h-16 rounded-lg">
			{row.cells.map((cell, idx) => {
				return (
					<td key={idx} {...cell.getCellProps()} id={`td_${cell.column.id}`} className="bg-green-charleston pl-3 pr-3">
						{cell.render('Cell')}
					</td>
				)
			})}
		</tr>
	)
}

const FilterButton = ({ showFilterButton, onChange, label, checked }: { showFilterButton: boolean } & IToggleProps) => {
	if (!showFilterButton) {
		return null
	}

	return (
		<div className="relative w-full pb-2">
			<div className="absolute left-0">
				<ToggleSwitch onChange={onChange} checked={checked} label={label} />
			</div>
		</div>
	)
}

export const Table: React.FC<IProps> = ({ columns, data, showFilterButton, className }) => {
	const [filterActive, setFilterActive] = useState(true)

	// Memoized filtered data
	const filteredData = useMemo(() => {
		return filterActive && showFilterButton ? data.filter((item) => Date.now() <= item.endTime * 1000) : data
	}, [data, filterActive, showFilterButton])

	const tableInstance = useTable(
		{ columns, data: filteredData, initialState: { pageIndex: 0, pageSize: 20 } },
		useSortBy,
		usePagination,
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
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

			<div className="overflow-x-auto">
				<table
					{...getTableProps()}
					className={`table-rounded-td-lg w-full border-separate border-spacing-y-4 ${className}`}>
					<thead>
						{headerGroups.map((headerGroup, idx) => (
							<TableHeader headers={headerGroup} key={idx} />
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{page.map((row, idx) => {
							prepareRow(row)

							return <TableRow row={row} key={idx} />
						})}
					</tbody>
				</table>
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
