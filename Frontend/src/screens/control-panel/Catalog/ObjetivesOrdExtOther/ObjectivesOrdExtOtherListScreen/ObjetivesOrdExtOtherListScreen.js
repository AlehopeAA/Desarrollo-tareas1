import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Visibility, Edit, Delete, Calculate } from '@mui/icons-material'
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip'
import DeleteObjective from 'components/Modal/ObjectivesModals/DeleteObjectiveModal'
import ObjectivesTable from 'components/ReactTable/ObjectivesTable/ObjectivesTable'
import UpdateObjective from 'components/Modal/ObjectivesModals/UpdateObjectiveModal'
import ViewObjectiveInfo from 'components/Modal/ObjectivesModals/ViewObjectiveInfoModal'
import ViewHistorical from 'components/Modal/ObjectivesModals/ViewHistoricalModal'
import Button from 'components/CustomButtons/Button'
import { getObjetivesOrdExtOther } from 'redux/actions/objetivesOrdExtOtherAction'
import { OBJETIVES_ORD_EXT_OTHER_LIST_RESET } from 'redux/constants/objetivesOrdExtOtherConstants'
import { OBJETIVES_HISTORICAL_RESET } from 'redux/constants/objetivesOrdExtOtherConstants'
import { objetivesOrdExtUpdateInfo, deleteObjetivesOrdExtOther } from 'redux/actions/objetivesOrdExtOtherAction'
import { OBJETIVES_ORD_EXT_DELETE_RESET } from 'redux/constants/objetivesOrdExtOtherConstants'
import { OBJETIVES_ORD_EXT_UPDATE_RESET } from 'redux/constants/objetivesOrdExtOtherConstants'
import SweetAlert from 'react-bootstrap-sweetalert'

const ObjetivesOrdExtOtherListScreen = () => {
  const dispatch = useDispatch()

  const { loadingObjetiveOrdExtOtherList, objetiveOrdExtOtherListData, successObjetiveOrdExtOtherList } = useSelector(
    (state) =>{
      
      return state.objetiveOrdExtOtherList} 
  )  

  const { successObjetiveOrdExtUpdate } = useSelector((state) => state.objetivesOrdExtUpdate)

  const { successObjetiveOrdExtDelete } = useSelector((state) => state.objetivesOrdExtDelete)

  const [infodata, setData] = useState([])
  const [alert, setAlert] = useState(null)

  const [viewObjectiveInfoModal, setViewObjectiveInfoModal] = useState(false)
  const [showObjectiveInfo, setShowObjectiveInfo] = useState({})

  const [updateObjectiveModal, setUpdateObjectiveModal] = useState(false)
  const [updateObjectiveInfo, setUpdateObjectiveInfo] = useState({})

  const [deleteObjectiveModal, setDeleteObjectiveModal] = useState(false)
  const [deleteObjectiveInfo, setDeleteObjectiveInfo] = useState({})

  const [viewHistoricalModal, setViewHistoricalModal] = useState(false)
  const [viewListModal, setViewListModal] = useState(true)
  const [showHistorical, setShowHistorical] = useState({})

  const showInfoHandler = (data) => {
    setShowObjectiveInfo(data)
    setViewObjectiveInfoModal(true)
  }
  const closeInfoModal = () => {
    setShowObjectiveInfo({})
    setViewObjectiveInfoModal(false)
  }

  const updateHandler = (data) => {
    setUpdateObjectiveInfo(data)
    setUpdateObjectiveModal(true)
  }
  const closeUpdateModal = () => {
    setUpdateObjectiveInfo({})
    setUpdateObjectiveModal(false)
    setAlert(null)
  }
  const deleteHandler = (data) => {
    setDeleteObjectiveInfo(data)
    setDeleteObjectiveModal(true)
  }
  const closeDeleteModal = () => {
    setDeleteObjectiveInfo({})
    setDeleteObjectiveModal(false)
    setAlert(null)
  }
  const sendUpdateInfo = (updatedInfo) => {
    dispatch(objetivesOrdExtUpdateInfo(updatedInfo))
  }
  const sendDelete = (id) => {
    dispatch(deleteObjetivesOrdExtOther(id))
  }
  const historicalHandler = (data) => {
    setViewHistoricalModal(true)
    setViewListModal(false)
    setShowHistorical(data)
    dispatch({ type: OBJETIVES_ORD_EXT_OTHER_LIST_RESET })
    dispatch({ type: OBJETIVES_HISTORICAL_RESET })
  }
  const closeHistoricalModal = () => {
    setViewHistoricalModal(false)
    setViewListModal(true)
    setShowHistorical({})
  }  

  useEffect(() => {
    if (successObjetiveOrdExtUpdate) {
      setAlert(
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title='GUARDADO!'
          onConfirm={() => closeUpdateModal()}
          onCancel={() => closeUpdateModal()}
        >
          El objetivo ha sido guardado correctamente
        </SweetAlert>
      )
      dispatch({ type: OBJETIVES_ORD_EXT_UPDATE_RESET })
      dispatch({ type: OBJETIVES_ORD_EXT_OTHER_LIST_RESET })
    }
  }, [successObjetiveOrdExtUpdate])

  useEffect(() => {
    if (successObjetiveOrdExtDelete) {
      setAlert(
        <SweetAlert
          danger
          style={{ display: 'block', marginTop: '-100px' }}
          title='ELIMINADO'
          onConfirm={() => closeDeleteModal()}
          onCancel={() => closeDeleteModal()}
        >
          El objetivo ha sido eliminado correctamente
        </SweetAlert>
      )
      dispatch({ type: OBJETIVES_ORD_EXT_DELETE_RESET })
      dispatch({ type: OBJETIVES_ORD_EXT_OTHER_LIST_RESET })
    }
  }, [successObjetiveOrdExtDelete])

  useEffect(() => {
    if (successObjetiveOrdExtOtherList) {
      console.log(objetiveOrdExtOtherListData)
      const objectives = objetiveOrdExtOtherListData.map((item) => {
        
        return {
          ...item,
          fullUnidades: `${item?.unidades_minimo || '-'} / ${item?.unidades_medio || '-'} / ${item?.unidades_maximo || '-'}  `,
          fullEntrada: `${item?.porcentaje_entrada_minimo || '-'} / ${item.porcentaje_entrada_medio || '-'} / ${item.porcentaje_entrada_maximo || '-'} `,
          fullTiempo: `${item?.tiempo_minimo || '-'} / ${item?.tiempo_medio || '-'} / ${item?.tiempo_maximo || '-'}  `,
          fullJornada: `${item?.porcentaje_jornada_minimo || '-'} / ${item.porcentaje_jornada_medio || '-'} / ${item.porcentaje_jornada_maximo || '-'} `,
          actions: (
            <div className='actions-right'>
              <Button justIcon round simple size='sm' onClick={() => showInfoHandler(item)} color='success' className='view'>
                <Tooltip title='Ver Información'>
                  <Visibility />
                </Tooltip>
              </Button>
              <Button justIcon round simple size='sm' onClick={() => updateHandler(item)} color='primary' className='edit'>
                <Tooltip title='Editar Información'>
                  <Edit />
                </Tooltip>
              </Button>
              <Button justIcon round simple size='sm' onClick={() => deleteHandler(item)} color='danger' className='delete'>
                <Tooltip title='Borrar'>
                  <Delete />
                </Tooltip>
              </Button>
              <Button justIcon round simple size='sm' onClick={() => historicalHandler(item)} color='info' className='view'>
                <Tooltip title='Ver histórico'>
                  <Calculate />
                </Tooltip>
              </Button>              
            </div>
          ),
        }
      })
      setData(objectives)
    } else {
      dispatch(getObjetivesOrdExtOther())
    }
  }, [dispatch, successObjetiveOrdExtOtherList])

  useEffect(() => {
    return () => dispatch({ type: OBJETIVES_ORD_EXT_OTHER_LIST_RESET })
  }, [dispatch])

  return (
    <>
      {!loadingObjetiveOrdExtOtherList && (
        <>
          {viewListModal && (
            <ObjectivesTable data={infodata} label={'Tareas de Perfil'} />
          )}
          {viewObjectiveInfoModal && (
            <ViewObjectiveInfo
              closeViewActivityInfoModal={closeInfoModal}
              viewActivityInfo={showInfoHandler}
              info={showObjectiveInfo}
            />
          )}
          {updateObjectiveModal && (
            <UpdateObjective
              sendUpdateInfo={sendUpdateInfo}
              closeUpdateActivityModal={closeUpdateModal}
              updateActivityModal={updateHandler}
              info={updateObjectiveInfo}
            />
          )}

          {deleteObjectiveModal && (
            <DeleteObjective
              sendDelete={sendDelete}
              closeDeleteActivityModal={closeDeleteModal}
              deleteActivityModal={deleteHandler}
              deleteActivityInfo={deleteObjectiveInfo}
            />
          )}
          {viewHistoricalModal && (
            <ViewHistorical
              closeViewActivityInfoModal={closeHistoricalModal}
              info={showHistorical}
              label='Tareas de Perfil'
            />
          )}
        </>
      )}{' '}
      {alert}
    </>
  )
}

export default ObjetivesOrdExtOtherListScreen
