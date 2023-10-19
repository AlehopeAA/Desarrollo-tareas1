import React from 'react'
import { useTable, useFilters } from 'react-table'

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Buscar...`}
    />
  )
}

const EvaluacionTable = ( {columns, data, showFilters, scrollX }) => {
  
  const filterTypes = React.useMemo(
    () => ({
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: showFilters? DefaultColumnFilter: <></>,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
  )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10)

  return (
    <>
      <table {...getTableProps()}
        style={{ overflowX: scrollX ? 'scroll' : 'auto', display: 'block', maxWidth: '100%', width: '100%', borderSpacing: '0' }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}
                  style={{
                    width: '20%',
                    textAlign: 'center',
                  }}
                >
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}
                style={{
                  width: '20%',
                  textAlign: 'center',
                }}
              >
                {row.cells.map(cell => {
                  const {
                    props: { value },
                  } = cell.render('Cell')
                  return <td {...cell.getCellProps()}> {!value ? '-' : cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}



export default EvaluacionTable
