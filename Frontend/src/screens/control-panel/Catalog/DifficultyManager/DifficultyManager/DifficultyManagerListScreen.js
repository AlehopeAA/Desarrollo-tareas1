import { useEffect, useState } from 'react'
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import ReactTable from 'components/ReactTable/ReactTable'
import styles from './styles/difficultyManagerListScreenStyles'
import { getDifficulties } from 'redux/actions/difficultiesActions'
import { DIFFICULTIES_DELETE_RESET } from 'redux/constants/difficultiesConstants'
import DeleteActionModal from 'components/ReactTableActions/Delete/DeleteActionModal'
import { useDispatch, useSelector } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import { deleteDifficulty } from 'redux/actions/difficultiesActions'

const useStyles = makeStyles(styles)

const DifficultyManagerListScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [alert, setAlert] = useState(null)

  const [showDeleteDifficulty, setShowDeleteDifficulty] = useState({})
  const [deleteDifficultyModal, setDeleteDifficultyModal] = useState(false)

  const { loadingDifficultiesList, successDifficultiesList, difficultiesList } = useSelector(
    (state) => state.difficultiesList
  )

  const { loadingDifficultiesDelete, successDifficultiesDelete, errorDifficultiesDelete } = useSelector(
    (state) => state.difficultiesDelete
  )
  useEffect(() => {
    dispatch(getDifficulties())
  }, [])
  useEffect(() => {
    if (successDifficultiesList) {
      const { dificulties } = difficultiesList
      const alldificulties = dificulties?.map((difficulty) => {
        return {
          id: difficulty.id_gestor_dificultad,
          descripcion_tarea: difficulty.descripcion_tarea,
          codigo_perfil: difficulty.codigo_perfil,
          fullName: `${difficulty.nombre} ${difficulty.apellido1} ${difficulty.apellido2} `,
          actions: (
            <Button
              justIcon
              round
              simple
              onClick={() => handleDeleteAction(difficulty.id_gestor_dificultad)}
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
      setData(alldificulties)
    }
  }, [successDifficultiesList])

  useEffect(() => {
    if (successDifficultiesDelete) {
      closeDeleteAction()
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='ELIMINADA'
          onConfirm={() => setAlert(null)}
          onCancel={() => setAlert(null)}
        >
          la gestion de dificultad ha sido eliminada correctamente
        </SweetAlert>
      )
      dispatch({ type: DIFFICULTIES_DELETE_RESET })
      dispatch(getDifficulties())
    }
  }, [successDifficultiesDelete])

  const closeDeleteAction = () => {
    setShowDeleteDifficulty({})
    setDeleteDifficultyModal(false)
  }
  const handleDeleteAction = (id) => {
    const { dificulties } = difficultiesList
    const difficultyToDelete = dificulties.find((difficulty) => difficulty.id_gestor_dificultad === id)
    setShowDeleteDifficulty(difficultyToDelete)
    setDeleteDifficultyModal(true)
  }
  const handleSubmitDelete = (e) => {
    e.preventDefault()
    dispatch(deleteDifficulty(showDeleteDifficulty.id_gestor_dificultad))
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingDifficultiesList ? (
                'Cargando Dificultades...'
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
      {deleteDifficultyModal && (
        <DeleteActionModal
          open={deleteDifficultyModal}
          handleCloseModal={closeDeleteAction}
          modalTitle='Eliminar dificultad'
          showDeleteInfo={showDeleteDifficulty.descripcion_tarea}
          handleSubmit={handleSubmitDelete}
          loadingDelete={loadingDifficultiesDelete}
          successDelete={successDifficultiesDelete}
          errorDelete={errorDifficultiesDelete}
        ></DeleteActionModal>
      )}
      {alert}
    </>
  )
}

export default DifficultyManagerListScreen
