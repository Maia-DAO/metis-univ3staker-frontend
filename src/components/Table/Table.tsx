// @ts-nocheck
import { BsArrowDownShort, BsArrowLeftShort, BsArrowRightShort, BsArrowUpShort } from 'react-icons/bs'
import { usePagination, useSortBy, useTable } from 'react-table'

interface IProps {
	data: any[]
	columns: any[]
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
							className={`absolute duration-200 top-1/2 -translate-y-1/2 -right-1 ${
								column.isSorted
									? 'translate-x-5 opacity-100 pointer-events-auto'
									: 'translate-x-0 opacity-0 pointer-events-none'
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
		<tr {...row.getRowProps()} className="bg-green-charleston h-16 rounded-lg">
			{row.cells.map((cell, idx) => {
				return (
					<td key={idx} {...cell.getCellProps()} id={`td_${cell.column.id}`} className="pl-3 pr-4">
						{cell.render('Cell')}
					</td>
				)
			})}
		</tr>
	)
}

export const Table: React.FC<IProps> = ({ columns, data }) => {
	const tableInstance = useTable(
		{ columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
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
		<div className="bg-dark-gunmetal rounded-xl p-4 text-white w-full shadow-[0px_6px_14px_-3px_rgba(0,_0,_0,_0.25)]">
			<div className="overflow-x-auto">
				<table {...getTableProps()} className="w-full border-separate border-spacing-y-4 table-rounded-td-lg">
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

			<div className="space-x-1 flex justify-center items-center pb-3 mt-2">
				<button
					className="text-darkOrange disabled:text-dark/20 dark:disabled:text-white/40 p-1"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}>
					<BsArrowLeftShort size={24} />
				</button>

				<span className="text-sm text-dark/70 dark:text-white/70">
					Page {Math.min(pageIndex + 1, pageOptions.length)} of {pageOptions.length}
				</span>
				<button
					className="text-darkOrange disabled:text-dark/20 dark:disabled:text-white/40 p-1"
					onClick={() => nextPage()}
					disabled={!canNextPage}>
					<BsArrowRightShort size={24} />
				</button>
			</div>
		</div>
	)
}
