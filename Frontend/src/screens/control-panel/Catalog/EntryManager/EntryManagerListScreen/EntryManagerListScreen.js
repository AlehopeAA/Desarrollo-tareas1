import { useEffect, useState } from 'react'
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import ReactTable from 'components/ReactTable/ReactTable'
import styles from './styles/entryManagerListScreenStyles'
import { useDispatch, useSelector } from 'react-redux'
import { getEntries } from 'redux/actions/entriesActions'
import DeleteActionModal from 'components/ReactTableActions/Delete/DeleteActionModal'
import { deleteEntry } from 'redux/actions/entriesActions'
import SweetAlert from 'react-bootstrap-sweetalert'
import { ENTRIES_DELETE_RESET } from 'redux/constants/entriesConstants'
import { ENTRIES_LIST_RESET } from 'redux/constants/entriesConstants'

const useStyles = makeStyles(styles)

const EntryManagerListScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [alert, setAlert] = useState(null)

  const [showDeleteEntry, setShowDeleteEntry] = useState({})
  const [deleteEntryModal, setDeleteEntryModal] = useState(false)

  const { loadingEntriesList, successEntriesList, entriesList } = useSelector((state) => state.entriesList)

  const { loadingEntriesDelete, successEntriesDelete, errorEntriesDelete } = useSelector((state) => state.entriesDelete)

  useEffect(() => {
    dispatch(getEntries())
  }, [])

  useEffect(() => {
    if (successEntriesList) {
      const { entries } = entriesList
      const allentries = entries?.map((entry) => {
        return {
          id: entry.id_gestor_entrada,
          descripcion_tarea: entry.descripcion_tarea,
          codigo_perfil: entry.codigo_perfil,
          fullName: `${entry.nombre} ${entry.apellido1} ${entry.apellido2} `,
          actions: (
            <Button
              justIcon
              round
              simple
              onClick={() => handleDeleteAction(entry.id_gestor_entrada)}
              color='danger'
              className='delete'
            >
              <Tooltip title='Borrar'>
                <Delete />
              </Tooltip>
            </Button>
          ),
        }
      })
      setData(allentries)
    }
  }, [successEntriesList])

  useEffect(() => {
    if (successEntriesDelete) {
      closeDeleteAction()
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='ELIMINADA'
          onConfirm={() => setAlert(null)}
          onCancel={() => setAlert(null)}
        >
          La entrada ha sido eliminada correctamente
        </SweetAlert>
      )
      dispatch({ type: ENTRIES_DELETE_RESET })
      dispatch(getEntries())
    }
  }, [successEntriesDelete])

  const closeDeleteAction = () => {
    setShowDeleteEntry({})
    setDeleteEntryModal(false)
  }
  const handleDeleteAction = (id) => {
    const { entries } = entriesList
    const entryToDelete = entries.find((entry) => entry.id_gestor_entrada === id)
    setShowDeleteEntry(entryToDelete)
    setDeleteEntryModal(true)
  }
  const handleSubmitDelete = (e) => {
    e.preventDefault()
    dispatch(deleteEntry(showDeleteEntry.id_gestor_entrada))
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingEntriesList ? (
                'Cargando Entradas...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'DESCRIPCION DE TAREA',
                      accessor: 'descripcion_tarea',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'PERFIL',
                      accessor: 'codigo_perfil',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'GESTOR',
                      accessor: 'fullName',
                      Cell: ({ value }) => <Tooltip title={<span style={{ fontSize: "16px" }}>{value}</span>} placement="bottom"><span>{value}</span></Tooltip>
                    },
                    {
                      Header: 'ACCIONES',
                      accessor: 'actions',
                    },
                  ]}
                  data={data}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {deleteEntryModal && (
        <DeleteActionModal
          open={deleteEntryModal}
          handleCloseModal={closeDeleteAction}
          modalTitle='Eliminar entrada'
          showDeleteInfo={showDeleteEntry.descripcion_tarea}
          handleSubmit={handleSubmitDelete}
          loadingDelete={loadingEntriesDelete}
          successDelete={successEntriesDelete}
          errorDelete={errorEntriesDelete}
        ></DeleteActionModal>
      )}
      {alert}
    </>
  )
}

export default EntryManagerListScreen
