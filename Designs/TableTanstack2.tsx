import React from 'react'
import ReactDOM from 'react-dom/client'

import './table.css'

import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import { ResultProps } from '@/Utils/types'

const CalcGrade = (val: number) => {
  let gd = "F"
  if (val > 39.9) { gd = "D" };
  if (val > 44.9) { gd = "D+" };
  if (val > 49.9) { gd = "C" };
  if (val > 54.9) { gd = "C+" };
  if (val > 59.9) { gd = "B" };
  if (val > 69.9) { gd = "B+" };
  if (val > 79.9) { gd = "A" };
  return gd
}

const CalcGradePoint = (val: number) => {
  let gp = "0.0"
  if (val > 39.9) { gp = "1.0" };
  if (val > 44.9) { gp = "1.5" };
  if (val > 49.9) { gp = "2.0" };
  if (val > 54.9) { gp = "2.5" };
  if (val > 59.9) { gp = "3.0" };
  if (val > 69.9) { gp = "3.5" };
  if (val > 79.9) { gp = "4" };
  return gp
}

const CalcWeightedPoint = (cv: number, mark: number) => {
  let wp = 0
  if (mark > 39.9) { wp = 1.0 * cv };
  if (mark > 44.9) { wp = 1.5 * cv };
  if (mark > 49.9) { wp = 2.0 * cv };
  if (mark > 54.9) { wp = 2.5 * cv };
  if (mark > 59.9) { wp = 3.0 * cv };
  if (mark > 69.9) { wp = 3.5 * cv };
  if (mark > 79.9) { wp = 4.0 * cv };
  return wp
}


const defaultColumns: ColumnDef<ResultProps>[] = [
  {
    accessorFn: row => row.course.course_code,
    id: 'code',
    cell: info => info.getValue(),
    size: 250,
    header: () => <span>Code</span>,
    footer: props => props.column.id,
  },
  {
    accessorFn: row => row.course.main_course.course_name,
    id: 'title',
    cell: info => info.getValue(),
    size: 700,
    header: () => <span>Title</span>,
    footer: props => props.column.id,
  },
  {
    accessorFn: row => row.course.course_credit,
    id: 'cv',
    cell: info => info.getValue(),
    size: 100,
    header: () => <span>CV</span>,
    footer: props => props.column.id,
  },
  {
    accessorFn: row => ((row.ca) + parseInt(row.exam)),
    id: 'marks',
    cell: info => info.getValue(),
    size: 125,
    header: () => <span>Marks</span>,
    footer: props => props.column.id,
  },
  {
    accessorFn: row => CalcGrade(row.ca + parseInt(row.exam)),
    id: "calculated grade",
    header: () => <span>GD</span>,
    footer: props => props.column.id,
  },
  {
    accessorFn: row => CalcGradePoint(row.ca + parseInt(row.exam)),
    id: "calculated grade point",
    header: () => <span>GP</span>,
    footer: props => props.column.id,
  },
  {
    accessorFn: row => CalcWeightedPoint(row.course.course_credit, (row.ca + parseInt(row.exam))),
    id: "cv * gp",    
    header: () => <span>WP</span>,
    footer: props => props.column.id,
  },
]

const TableTanstack2 = (props: any) => {
  const [data, setData] = React.useState(() => [...props.data])
  console.log(data)
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ])

  const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>('onChange')

  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  return (
    <div className="p-2">
 
      <div className="overflow-x-auto w-full">
        <div
          {...{
            className: 'divTable w-full',
            style: {
              // fontSize: 10,
            },
          }}
        >
          <div className="thead">
            {table.getHeaderGroups().map(headerGroup => (
              <div key={headerGroup.id}
                {...{
                  className: 'tr',
                }}
              >
                {headerGroup.headers.map(header => (
                  <div key={header.id}
                    {...{
                      className: 'th',
                      style: {
                        width: header.getSize(),
                        font: "bold",
                        fontWeight: 200,
                        fontSize: 13,
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                        style: {
                          transform:
                            columnResizeMode === 'onEnd' &&
                            header.column.getIsResizing()
                              ? `translateX(${
                                  table.getState().columnSizingInfo.deltaOffset
                                }px)`
                              : '',
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            {...{
              className: 'tbody',
            }}
          >
            {table.getRowModel().rows.map(row => (
              <div key={row.id}
                {...{
                  className: 'tr',
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <div key={cell.id}
                    {...{
                      className: 'td',
                      style: {
                        width: cell.column.getSize(),
                        fontSize: 11,
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default TableTanstack2
