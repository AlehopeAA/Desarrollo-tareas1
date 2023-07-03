import { useState, useMemo } from 'react'
import { useTable, useFilters, useAsyncDebounce, useSortBy, usePagination } from 'react-table'
import classnames from 'classnames'
import { matchSorter } from 'match-sorter'
import { FormControl, Select, MenuItem, makeStyles } from '@material-ui/core'
import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'
import CustomInput from 'components/CustomInput/CustomInput'
import styles from './styles/reactTableStyles'

const useStyles = makeStyles(styles)

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
  return (
    <CustomInput
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        value: filterValue || '',
        onChange: (e) => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        },
        placeholder: `Buscar...`,
      }}
    />
  )
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
}
fuzzyTextFilterFn.autoRemove = (val) => !val

const ReactTable = ({ columns, data, numFilas }) => {
  const classes = useStyles()

  const [numberOfRows, setNumberOfRows] = useState(numFilas ? numFilas : 10)
  const [pageSelect, handlePageSelect] = useState(0)

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), [])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    nextPage,
    pageOptions,
    pageCount,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageSize: numFilas ? numFilas : 10, pageIndex: 0 },
    },
    useFilters, // useFilters!
    useSortBy,
    usePagination
  )

  let numberOfRowsData = [5, 10, 20, 25, 50, 100]
  let pageSelectData = Array.apply(null, Array(pageOptions.length)).map(function () {})
  return (
    <div style={{ display: 'block', maxWidth: '100%' }}>
      <div
        className='ReactTable -striped -highlight'
        style={{ display: 'block', overflowX: 'scroll', whiteSpace: 'nowrap', maxWidth: '100%' }}
      >
        <div className='pagination-top'>
          <div className='-pagination'>
            <div className='-previous'>
              <button type='button' onClick={() => previousPage()} disabled={!canPreviousPage} className='-btn'>
                Anterior
              </button>
            </div>
            <div className='-center'>
              <GridContainer className={classes.gridContainer}>
                <GridItem xs={12} sm={6} md={4}>
                  <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.formControlMargins}>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      value={pageSelect}
                      onChange={(event) => {
                        gotoPage(event.target.value)
                        handlePageSelect(event.target.value)
                      }}
                      inputProps={{
                        name: 'pageSelect',
                        id: 'page-select',
                      }}
                    >
                      {pageSelectData?.map((prop, key) => {
                        return (
                          <MenuItem
                            key={key}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected,
                            }}
                            value={key}
                          >
                            Página {key + 1}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <FormControl fullWidth className={classes.selectFormControl + ' ' + classes.formControlMargins}>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      value={numberOfRows}
                      onChange={(event) => {
                        setPageSize(event.target.value)
                        setNumberOfRows(event.target.value)
                      }}
                      inputProps={{
                        name: 'numberOfRows',
                        id: 'number-of-rows',
                      }}
                    >
                      {numberOfRowsData.map((prop) => {
                        return (
                          <MenuItem
                            key={prop}
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected,
                            }}
                            value={prop}
                          >
                            {prop} lineas
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </div>
            <div className='-next'>
              <button type='button' onClick={() => nextPage()} disabled={!canNextPage} className='-btn'>
                Siguiente
              </button>
            </div>
          </div>
        </div>
        <table
          {...getTableProps()}
          className='rt-table'
          style={{ display: 'table', width: '100%', borderSpacing: '0' }}
        >
          <thead className='rt-thead -header'>
            {headerGroups.map((headerGroup) => (
              <><tr {...headerGroup.getHeaderGroupProps()} className='rt-tr'>
                {headerGroup.headers.map((column, key) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={classnames('rt-th rt-resizable-header', {
                      '-cursor-pointer': headerGroup.headers.length - 1 !== key,
                      '-sort-asc': column.isSorted && !column.isSortedDesc,
                      '-sort-desc': column.isSorted && column.isSortedDesc
                    })}
                    style={{
                      width: '100px',
                      textAlign: 'center'
                    }}
                  >
                    <div className='rt-resizable-header-content'>{column.render('Header')}</div>
                    {/* Render the columns filter UI */}                    
                  </th>                                    
                ))}
              </tr>
              <tr {...headerGroup.getHeaderGroupProps()} className='rt-tr'>
              {headerGroup.headers.map((column, key) => (
                  <th className={classnames('rt-th rt-resizable-header')}
                  style={{
                    width: '100px',
                    textAlign: 'center'
                  }}
                  >
                  <div>
                      {headerGroup.headers.length - 1 === key
                        ? null
                        : column.canFilter
                          ? column.render('Filter')
                          : null}
                    </div>
                    </th>
                    ))}
                </tr></>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className='rt-tbody' style={{ minWidth: 'min-content' }}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr
                  {...row.getRowProps()}
                  className={classnames('rt-tr', { ' -odd': i % 2 === 0 }, { ' -even': i % 2 === 1 })}
                >
                  {row.cells.map((cell) => {
                    const {
                      props: { value },
                    } = cell.render('Cell')
                    return (
                      <td
                        {...cell.getCellProps()}
                        className='rt-td'
                        style={{
                          textAlign: 'center',
                          maxWidth: '250px',
                          width: 'min-content',
                          display: 'inline',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {value == 0 ? 0 : !value ? '-' : cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='pagination-bottom'></div>
      </div>
    </div>
  )
}
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

filterGreaterThan.autoRemove = (val) => typeof val !== 'number'

export default ReactTable
