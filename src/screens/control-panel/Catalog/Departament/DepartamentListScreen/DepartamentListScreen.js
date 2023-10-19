import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, makeStyles, Tooltip } from '@material-ui/core'
import { Visibility, Delete, Edit } from '@material-ui/icons'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import UpdateDepartamentModal from './components/UpdateDepartamentModal'
import DeleteDepartamentModal from './components/DeleteDepartamentModal'
import ViewDepartamentModal from './components/ViewDepartamentModal'
import { getDepartaments } from 'redux/actions/departamentActions'
import styles from './styles/departamentListScreenStyles'

const useStyles = makeStyles(styles)

const DepartamentListScreen = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [data, setData] = useState([])
  const [showUpdateDepartament, setShowUpdateDepartament] = useState({})
  const [showDeleteDepartament, setShowDeleteDepartament] = useState({})
  const [updateDepartamentModal, setUpdateDepartamentModal] = useState(false)
  const [deleteDepartamentModal, setDeleteDepartamentModal] = useState(false)
  const [showViewDepartament, setShowViewDepartament] = useState({})
  const [showViewDepartamentModal, setShowViewDepartamentModal] = useState(false)
  
  const { loadingDepartamentList, departaments, successDepartamentList, errorDepartamentList } = useSelector(
    (state) => state.departamentList
  )

  useEffect(() => {
    if (successDepartamentList) {
      const list = departaments.map((item) => {
        return {
          ...item,
          descripcion_departamento: item.descripcion_departamento === 'undefined' ? '' : item.descripcion_departamento,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateDepartamentHandler(item.id_departamento)}
                color='primary'
                className='active-deactive'
              >
                <Tooltip title='Editar Información'>
                  <Edit />
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                simple
                onClick={() => showViewDepartamentHandler(item.id_departamento)}
                color='success'
                className='edit'
              >
                <Tooltip title='Ver Información'>
                  <Visibility />
                </Tooltip>
              </Button>
              <Button
                justIcon
                round
                simple
                onClick={() => showDeleteDepartamentHandler(item.id_departamento)}
                color='danger'
                className='delete'
              >
                <Tooltip title='Borrar'>
                  <Delete />
                </Tooltip>
              </Button>
            </div>
          ),
        }
      })
      setData(list)
      return
    }
    dispatch(getDepartaments())
  }, [dispatch, successDepartamentList])

  useEffect(() => {
    dispatch(getDepartaments())
  }, [dispatch])

  const showUpdateDepartamentHandler = (id) => {
    const departament = departaments.find((departament) => departament.id_departamento === id)
    setShowUpdateDepartament(departament)
    setUpdateDepartamentModal(true)
  }

  const handleCloseModal = () => {
    setUpdateDepartamentModal(false)
    setShowUpdateDepartament({})
  }

  const showDeleteDepartamentHandler = (id) => {
    const departament = departaments.find((departament) => departament.id_departamento === id)
    setShowDeleteDepartament(departament)
    setDeleteDepartamentModal(true)
  }

  const closeDeleteDepartamentModal = () => {
    setDeleteDepartamentModal(false)
    setShowDeleteDepartament({})
  }

  const showViewDepartamentHandler = (id) => {
    const departament = departaments.find((departament) => departament.id_departamento === id)
    setShowViewDepartament(departament)
    setShowViewDepartamentModal(true)
  }

  const closeViewDepartamentModal = () => {
    setShowViewDepartamentModal(false)
    setShowViewDepartament({})
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingDepartamentList ? (
                'Cargando Departamentoes...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'CODIGO DE DEPARTAMENTO',
                      accessor: 'codigo_departamento',
                    },
                    {
                      Header: 'DESCRIPCION',
                      accessor: 'descripcion_departamento',
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
            {errorDepartamentList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorDepartamentList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {showViewDepartamentModal && (
        <ViewDepartamentModal
          handleCloseViewModal={closeViewDepartamentModal}
          showViewDepartament={showViewDepartament}
          viewDepartamentModal={showViewDepartamentModal}
        />
      )}
      {updateDepartamentModal && (
        <UpdateDepartamentModal
          handleCloseModal={handleCloseModal}
          updateDepartamentModal={updateDepartamentModal}
          showUpdateDepartament={showUpdateDepartament}
        />
      )}
      {deleteDepartamentModal && (
        <DeleteDepartamentModal
          deleteDepartamentModal={deleteDepartamentModal}
          handleCloseDeleteDepartamentModal={closeDeleteDepartamentModal}
          showDeleteDepartamentInfo={showDeleteDepartament}
        />
      )}
    </>
  )
}

export default DepartamentListScreen
