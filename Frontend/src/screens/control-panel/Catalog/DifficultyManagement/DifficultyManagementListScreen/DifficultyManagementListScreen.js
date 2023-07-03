import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, makeStyles } from '@material-ui/core'
import { Visibility, Delete } from '@material-ui/icons'
import CardBody from 'components/Card/CardBody'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ReactTable from 'components/ReactTable/ReactTable'
import Button from 'components/CustomButtons/Button'
import SnackbarContent from 'components/Snackbar/SnackbarContent'
import UpdateUnitModal from './components/UpdateUnitModal'
import DeleteUnitModal from './components/DeleteUnitModal'
import { getUnits } from 'redux/actions/unitActions'
import styles from './styles/unitListScreenStyles'

const useStyles = makeStyles(styles)

const UnitListScreen = () => {
  const dispatch = useDispatch()
  const classes = {}

  const [data, setData] = useState([])
  const [showUpdateUnit, setShowUpdateUnit] = useState({})
  const [showDeleteUnit, setShowDeleteUnit] = useState({})
  const [updateUnitModal, setUpdateUnitModal] = useState(false)
  const [deleteUnitModal, setDeleteUnitModal] = useState(false)

  const { loadingUnitList, units, successUnitList, errorUnitList } = useSelector((state) => state.unitList)

  useEffect(() => {
    if (successUnitList) {
      const list = units.map((item) => {
        return {
          ...item,
          actions: (
            <div className='actions-right'>
              <Button
                justIcon
                round
                simple
                onClick={() => showUpdateUnitHandler(item.id_unidad)}
                color='success'
                className='edit'
              >
                <Visibility />
              </Button>
              <Button
                justIcon
                round
                simple
                onClick={() => showDeleteUnitHandler(item.id_unidad)}
                color='danger'
                className='delete'
              >
                <Delete />
              </Button>
            </div>
          ),
        }
      })
      setData(list)
      return
    }
    dispatch(getUnits())
  }, [dispatch, successUnitList])

  const showUpdateUnitHandler = (id) => {
    const unit = units.find((unit) => unit.id_unidad === id)
    setShowUpdateUnit(unit)
    setUpdateUnitModal(true)
  }

  const handleCloseModal = () => {
    setUpdateUnitModal(false)
    setShowUpdateUnit({})
  }

  const showDeleteUnitHandler = (id) => {
    const unit = units.find((unit) => unit.id_unidad === id)
    setShowDeleteUnit(unit)
    setDeleteUnitModal(true)
  }

  const closeDeleteUnitModal = () => {
    setDeleteUnitModal(false)
    setShowDeleteUnit({})
  }
  return (
    <>
      <GridContainer>
        <GridItem xs={12} className={classes.rootItem}>
          <Card>
            <CardBody>
              {loadingUnitList ? (
                'Cargando Unidades...'
              ) : (
                <ReactTable
                  columns={[
                    {
                      Header: 'CODIGO DE UNIDAD',
                      accessor: 'codigo_unidad',
                    },
                    {
                      Header: 'DESCRIPCION',
                      accessor: 'descripcion_unidad',
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
            {errorUnitList && (
              <GridContainer>
                <GridItem xs={12}>
                  <SnackbarContent message={errorUnitList} color='danger' />
                </GridItem>
              </GridContainer>
            )}
          </Card>
        </GridItem>
      </GridContainer>
      {updateUnitModal && (
        <UpdateUnitModal
          handleCloseModal={handleCloseModal}
          updateUnitModal={updateUnitModal}
          showUpdateUnit={showUpdateUnit}
        />
      )}
      {deleteUnitModal && (
        <DeleteUnitModal
          deleteUnitModal={deleteUnitModal}
          handleCloseDeleteUnitModal={closeDeleteUnitModal}
          showDeleteUnitInfo={showDeleteUnit}
        />
      )}
    </>
  )
}

export default UnitListScreen
